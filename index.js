//const winston = require("winston");
const express = require("express");
const winston = require("winston");
const {host, port} = require("./app/config")
const app = express();
//const { connectMongo } = require("./Database/mongodb")
const {redisMainConnection } = require("./database/redis")
//Logging
require("./app/logging")();

//Data Base
//connectMongo();

// Cache
redisMainConnection.init()

//Routes
require("./app/routes")(app);
console.log(JSON.stringify(require("./app/config")))
// Initiate the server on the selected host:port
app.listen(port, host, () => winston.info(`Server started as ${process.env.NODE_ENV} on ${host}:${port}`));

