// Modules
const express = require("express");
const router = express.Router();
const merchsRoutes = require("../routes/maps-routes/merchs-route")
const repsRoutes = require("../routes/maps-routes/reps-route")


router.use("/reps", repsRoutes)

router.use("/merchs", merchsRoutes)


module.exports = router;
