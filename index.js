const winston = require("winston");
const express = require("express");
const {host, port} = require("./app/config")
let app = express();
//const { connectMongo } = require("./Database/mongodb")
const {redisMainConnection } = require("./database/redis")
//Logging
require("./app/logging")();

//Data Base
//connectMongo();

//Routes
require("./app/routes")(app);

// Initiate the server on the selected host:port
app.listen(port, host, () => winston.info(`Server started as ${process.env.NODE_ENV} on ${host}:${port}`));


// Initialize Cache
redisMainConnection.init()
new (require("./controllers/admin-controller").AdminController)().cacheAllGovsReps()