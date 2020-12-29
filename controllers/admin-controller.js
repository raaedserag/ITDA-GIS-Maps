const {cashOfficeCounts, getOfficeCountsCash, getOfficeCountsDB} = require("../services/admin-service")

//--------------------------------------------------

module.exports.getOfficeCounts = async function(req, res){
    // Try to retreive from cash first
    let officeCounts = await getOfficeCountsCash()

    if(!officeCounts) { // Search DB instead of cash
        officeCounts = await getOfficeCountsDB()
        // If not found, then there's no data
        if(!officeCounts) return res.status(405).send("No available offices to count")
        // If found, then cash need to be updated, call it, don't wait and advance to format govs
        else{
            officeCounts = lookups_formatter(officeCounts)
            cashOfficeCounts()
        }
    }

    return res.status(200).send(officeCounts)
}
