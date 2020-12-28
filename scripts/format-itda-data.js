/* This script manipulate excel data as ITDA-Data.xlsx to convert it to encoded schema ITDA-DATA.xlsx and export */

const Excel = require('exceljs');
const fs = require("fs")
const governoratess = require("../samples/itda-govs.json")

async function main() {
    // Initialize sheet
    let workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./samples/ITDA-Data.xlsx')
    let worksheet = workbook.getWorksheet('Sheet1');

    // Read intended to be manipulated columns
    let govsColumn = worksheet.getColumn(3).values
    let logoColumn = worksheet.getColumn(15).values
    let phaseColumn = worksheet.getColumn(14).values
    let iconColumn = worksheet.getColumn(16).values
    let transColumn = worksheet.getColumn(9).values
    let revenuesColumn = worksheet.getColumn(10).values
    let latColumn = worksheet.getColumn(6).values
    let longColumn = worksheet.getColumn(7).values
    for (let index = 3; index < govsColumn.length; index++) {
        // Manipulate govs, convert gov names to gov codes
        let findedGov = governoratess.find((gov) => gov.ar_name == govsColumn[index].trim())
        if (findedGov) govsColumn[index] = findedGov.gov_code;
        else console.log(`Problem with element of row ${index}: ${govsColumn[index]}`)

        // Manipulate logo availability, convert Y | N to 1 | 0
        let is_available = logoColumn[index].trim();
        logoColumn[index] = (is_available == "Y" || is_available == "y") ? 1 : 0

        // Manipulate icon, if phase is 3 then put icon id(result), else it's empty ""
        iconColumn[index] = (phaseColumn[index] == 3)? iconColumn[index].result : ""

        // Manipulate trans & revenues
        
        if(!isNaN(transColumn[index])) transColumn[index] = parseInt(transColumn[index])
        if(!isNaN(revenuesColumn[index])) revenuesColumn[index] =  parseFloat(revenuesColumn[index]).toFixed(2)
        if(!isNaN(latColumn[index])) latColumn[index] =  parseFloat(latColumn[index])
        if(!isNaN(longColumn[index])) longColumn[index] =  parseFloat(longColumn[index])
    }
    // Edit manipulated columns & write xlsx file
    worksheet.getColumn(3).values = govsColumn;
    worksheet.getColumn(15).values = logoColumn;
    worksheet.getColumn(16).values = iconColumn;
    worksheet.getColumn(9).values = transColumn;
    worksheet.getColumn(10).values = revenuesColumn;
    worksheet.getColumn(6).values = latColumn;
    worksheet.getColumn(7).values = longColumn;
    await workbook.xlsx.writeFile('./samples/ITDA-Manipulated-Data.xlsx')

    // Format as json object & write json file
    let jsonRows = []
    worksheet.eachRow({ includeEmpty: false }, row => jsonRows.push({
        OFFICE_CODE: row.values[1],
        GOV_CODE: row.values[3],
        OFFICE_NAME: row.values[4],
        ADDRESS: row.values[5],
        LATITUDE: row.values[6],
        LONGITUDE: row.values[7],
        EMPLOYEESS_COUNT: row.values[8],
        TRANS_COUNT: row.values[9],
        REVENUES: row.values[10],
        CATEGORY_NAME: row.values[11],
        ATTACHED_TO: row.values[12],
        OFFICE_PHASE: row.values[14],
        LOGO_AVAILABLE: row.values[15],
        ICON_ID: row.values[16]
    }))

    fs.writeFileSync("./samples/ITDA-Data.json", JSON.stringify(jsonRows.slice(2), null, 2), {encoding: 'utf-8'})
}
main()

