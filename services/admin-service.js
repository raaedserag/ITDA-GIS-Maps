// Modules
const winston = require("winston")
// Helpers & services
const {twirlConsole} = require("../helpers/maps-helper")
const redisClient = require("../database/redis").redisMainConnection
const {getOfficeLocationsDB} = require("./maps-services")
const {getAllGovsCodes} = require("../helpers/maps-helper")
//----------------------------------


async function cashGovOffices(gov_code){
    let entries = []
    let offices = await getOfficeLocationsDB(gov_code)
    for (let office of offices) {
    entries.push(`OFFICE:${office.officeId}`)
    entries.push(JSON.stringify({office}))
    }
    let result = await redisClient.mSetHash(`ITDA_GOV:${gov_code}`, entries)
    return {gov_code, result};
}

module.exports.cashGovsOfficesLocations = async function(gov_code=null) {
    let interval = twirlConsole("Updating cache ")// For fun
    let cashResult;
    if(gov_code){
        cashResult =  await cashGovOffices(gov_code)
    }

    // Cash all govs
    else{
        let result = []
        let govs = getAllGovsCodes()
        for (let gov of govs) {
            let cashedOffices = await cashGovOffices(gov)
            if(cashedOffices) result = result.concat(cashedOffices)
        }

        cashResult =  (result && result.length)? result : null
    }
    clearInterval(interval) // Remove fun :D
    console.log("\n")
    winston.info(`Cache updated:\n, ${JSON.stringify(cashResult, null, 2)}`)
    return cashResult;
}