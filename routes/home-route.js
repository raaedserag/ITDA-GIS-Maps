const express = require("express");
const router = express.Router();

// Static Fiiles
const landingPage = require('path').resolve(__dirname, '../Public/landing.html')

router.get("/", (req, res) => {
    res.status(200).sendFile(landingPage)
})

module.exports = router;