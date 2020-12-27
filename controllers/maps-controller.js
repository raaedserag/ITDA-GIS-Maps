const {getOfficeLocationsDB} = require("../services/maps-services")
//--------------------------------------------------

async function getOfficesLocations(req, res){
    // Get office locations, filtered by governorate code, if null then retreive all offices
    let officeLocations = await getOfficeLocationsDB(req.body.gov_code);
    if(!officeLocations) return res.status(405).send("No available offices in this governorate")

    return res.status(200).send(officeLocations)
}

module.exports = {
    getOfficesLocations
}