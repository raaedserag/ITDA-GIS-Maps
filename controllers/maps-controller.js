const {getOfficeLocationsDB, getOfficeLocationsCash} = require("../services/maps-services")
const {cashGovsOfficesLocations} = require("../services/admin-service")
//--------------------------------------------------

async function getOfficesLocations(req, res){
    // Get office locations, filtered by governorate code, if null then retreive all offices
    // Try to retreive from cash first
    let officeLocations = await getOfficeLocationsCash(req.body.gov_code);

    if(!officeLocations) { // Search DB instead of cash
        officeLocations = await getOfficeLocationsDB(req.body.gov_code)
        // If not found, then there's no data
        if(!officeLocations) return res.status(405).send("No available offices in this governorate")
        // If found, then cash need to be updated, call it, don't wait and advance
        else{
            cashGovsOfficesLocations(req.body.gov_code)
        }
    }

    return res.status(200).send(officeLocations)
}

module.exports = {
    getOfficesLocations
}