// Initialize Router
const express = require("express");
const router = express.Router();
// Modules
const {getOfficesLocations} = require("../controllers/maps-controller")

//--------------------------------------------------
router.get("/offices-locations", getOfficesLocations)


module.exports = router;