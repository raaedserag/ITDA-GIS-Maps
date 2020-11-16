// Modules
const express = require("express");
const router = express.Router();

// Controllers
const {AdminController} = require("../../controllers/admin-controller")
//------------

// Cash All Sales Representatives
router.put("/cache-reps/all", async (req, res) => {
    let adminCI = new AdminController()
    let response = await adminCI.cacheAllGovsReps()
    await adminCI.destructor()
    res.status(response.code).send(response.result)
});

// Cash Sales Representatives of some Governorate
router.put("/cache-reps/:gov_code", async (req, res) => {
    let adminCI = new AdminController()
    let response = await adminCI.cashGovReps(req.params.gov_code)
    await adminCI.destructor()
    res.status(response.code).send(response.result)
});

module.exports = router;