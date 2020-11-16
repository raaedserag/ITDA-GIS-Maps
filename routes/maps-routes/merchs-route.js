// Modules
const express = require("express");
const router = express.Router();

// Controllers
const {MapsController} = require("../../controllers/maps-controller")
//------------

// Get Merchants of some Representative
router.post("/by-rep", async (req, res) => {
    let mapsCI = new MapsController();
    let response = await mapsCI.getMerchsOfReps(req.body.rep_code)
    await mapsCI.destructor();
    res.status(response.code).send(response.result)
});

// Get Merchants of some Governorate
router.post("/by-gov", async (req, res) => {
    let mapsCI = new MapsController();
    let response = await mapsCI.getMerchsOfGovs(req.body.gov_code)
    await mapsCI.destructor();
    res.status(response.code).send(response.result)
});


module.exports = router;
