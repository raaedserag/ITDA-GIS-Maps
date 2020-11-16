// Modules
const express = require("express");
const router = express.Router();
const manageMapsRoutes = require("../routes/admin-routes/manage-maps-route")


router.use("/manage-maps", manageMapsRoutes)


module.exports = router;
