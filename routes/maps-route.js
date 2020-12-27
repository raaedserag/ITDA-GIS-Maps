// Initialize Router
const express = require("express");
const router = express.Router();
// Modules
const {JoiValidator} = require("../middlewares/validation-middleware")
const {getOfficesLocations} = require("../controllers/maps-controller")

//--------------------------------------------------
router.post("/offices-locations", [new JoiValidator([{gov_code: "govCode"}])], getOfficesLocations)


module.exports = router;