const MapsServices = require("../services/maps-services")
const AdminServices = require("../services/admin-service")
const {lookups_formatter} = require("../helpers/maps-helper")
//--------------------------------------------------

module.exports.getOfficesLocations = async function(req, res){
    // Get office locations, filtered by governorate code, if null then retreive all offices
    // Try to retreive from cash first
    let officeLocations = await MapsServices.getOfficeLocationsCash(req.body.gov_code);

    if(!officeLocations) { // Search DB instead of cash
        officeLocations = await MapsServices.getOfficeLocationsDB(req.body.gov_code)
        // If not found, then there's no data
        if(!officeLocations) return res.status(405).send("No available offices in this governorate")
        // If found, then cash need to be updated, call it, don't wait and advance
        else{
            AdminServices.cashAllOfficesLocations(req.body.gov_code)
        }
    }

    return res.status(200).send(officeLocations)
}


module.exports.getOfficeCounts = async function(req, res){
    // Try to retreive from cash first
    let officeCounts = await MapsServices.getOfficeCountsCash()

    if(!officeCounts) { // Search DB instead of cash
        officeCounts = await MapsServices.getOfficeCountsDB()
        // If not found, then there's no data
        if(!officeCounts) return res.status(405).send("No available offices to count")
        // If found, then cash need to be updated, call it, don't wait and advance to format govs
        else{
            officeCounts = lookups_formatter(officeCounts)
            AdminServices.cashOfficeCounts()
        }
    }

    return res.status(200).send(officeCounts)
}
