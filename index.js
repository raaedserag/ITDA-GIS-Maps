//const winston = require("winston");
const express = require("express");
const winston = require("winston");
const {host, port, api_host} = require("./app/config")
let app = express();
//const { connectMongo } = require("./Database/mongodb")
const {redisMainConnection } = require("./database/redis")
//Logging
require("./app/logging")();

//Data Base
//connectMongo();

// Cache
redisMainConnection.init()

//Routes
if (api_host) app = express.Router().use(api_host, )
require("./app/routes")(app);

// Initiate the server on the selected host:port
app.listen(port, host, () => winston.info(`Server started as ${process.env.NODE_ENV} on ${host}:${port}`));