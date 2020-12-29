// Modules
const oracledb = require("oracledb")
const {OracleConnection} = require("../database/oracle")
const redisClient = require("../database/redis").redisMainConnection
// Helpers
const {office_formatter, getAllGovsCodes} = require("../helpers/maps-helper")
// constants
const {oracle_config} = require("../app/config")
//--------------------------------------------------
module.exports.getOfficeLocationsDB = async function(gov_code = null){
    // Create new oracle connection
    let dbConnection = new OracleConnection();
    
    // Configure sql statement
    let sqlStatement = `
    SELECT ID AS "officeId", OFFICE_CODE AS "officeCode", OFFICE_NAME AS "officeName", ADDRESS AS "address", LATITUDE AS "lat", LONGITUDE AS "long",
        EMPLOYEES_COUNT AS "numOfWorkers", TRANS_COUNT AS "numOfTransaction", REVENUES AS "revenues", CATEGORY_NAME AS "type",
        OFFICE_PHASE AS "officePhase", ATTACHED_TO AS "attachedTo", LOGO_AVAILABLE AS "isLogoAvailable", GOV_CODE AS "gov_code",
        ICON_ID AS "iconId"
    FROM ${oracle_config.dbName}
    `
    if(gov_code) sqlStatement += `WHERE GOV_CODE=${gov_code}`
    
    // open connection :>> retreive data ::> close connection
    await dbConnection.init();
    let officeLocations = await dbConnection.client.execute(sqlStatement, {}, { outFormat: oracledb.OUT_FORMAT_OBJECT })
    dbConnection.destructor()

    // Check if data is available & retreive it
    if (!(officeLocations && officeLocations.rows && officeLocations.rows.length)) return null;
    return office_formatter(officeLocations.rows);
}

async function getCashedGovsOffices(gov_code){
    let result = await redisClient.getAllHash(`ITDA_GOV:${gov_code}`)
    if (!result) return null;
    
    return Object.values(result).map((value) => JSON.parse(value).office);
}

module.exports.getOfficeLocationsCash = async function(gov_code=null) {
    // Return 1 gov offices if gov_code is provided
    if(gov_code){
        return await getCashedGovsOffices(gov_code)
    }

    // Return all govs
    else{
        let result = []
        let govs = await getAllGovsCodes()
        for (let gov of govs) {
            let cashedOffices = await getCashedGovsOffices(gov)
            if(cashedOffices) result = result.concat(cashedOffices)
        }

        return (result && result.length)? result : null
    }
}

module.exports.getOfficeCountsDB = async function(){
    let connection = new OracleConnection()
    await connection.init()
    
    let lookups = await connection.client.execute(`
    SELECT * FROM ${oracle_config.lookupName}
    `)
    connection.destructor()
    return (lookups && lookups.rows && lookups.rows.length)?  lookups.rows : null;
}

module.exports.getOfficeCountsCash = async function(){
    let result = await redisClient.getAllHash(`ITDA_LOOKUPS`)
    if (!result) return null;
    
    return result;
}
