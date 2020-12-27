// Modules
const oracledb = require("oracledb")
const {OracleConnection} = require("../database/oracle")
// Helpers
const {office_formatter} = require("../helpers/maps-helper")
// constants
const {oracle_config} = require("../app/config")
//--------------------------------------------------
async function getOfficeLocationsDB(gov_code = null) {
    // Create new oracle connection
    let dbConnection = new OracleConnection();
    
    // Configure sql statement
    let sqlStatement = `
    SELECT OFFICE_CODE AS "officeCode", OFFICE_NAME AS "officeName", ADDRESS AS "address", LATITUDE AS "lat", LONGITUDE AS "long",
        EMPLOYEESS_COUNT AS "numOfWorkers", TRANS_COUNT AS "numOfTransaction", REVENUES AS "revenues", CATEGORY_NAME AS "type",
        OFFICE_PHASE AS "officePhase",ATTACHED_TO AS "attachedTo", LOGO_AVAILABLE AS "isLogoAvailable", GOV_CODE AS "gov_code",
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

module.exports = {
    getOfficeLocationsDB
}