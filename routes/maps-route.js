// Initialize Router
const express = require("express");
const router = express.Router();
// Modules
const {JoiValidator} = require("../middlewares/validation-middleware")
const MapsController = require("../controllers/maps-controller")

//--------------------------------------------------
router.post("/offices-locations", [new JoiValidator([{gov_code: "govCode"}])], MapsController.getOfficesLocations)
router.get("/offices-count", MapsController.getOfficeCounts)

module.exports = router;