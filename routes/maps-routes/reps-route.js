// Modules
const express = require("express");
const router = express.Router();

// Controllers
const {MapsController} = require("../../controllers/maps-controller")
//------------

// Get All Sales Representatives
router.get("/all", async (req, res) => {
    let mapsCI = new MapsController();
    let response = await mapsCI.getCashedAllReps();
    await mapsCI.destructor();
    res.status(response.code).send(response.result)
});

// Get Sales Representatives of some Governorate
router.post("/by-gov", async (req, res) => {
    let mapsCI = new MapsController();
    let response = await mapsCI.getCashedRepsOfGov(req.body.gov_code);
    await mapsCI.destructor();
    res.status(response.code).send(response.result)
});


module.exports = router;
