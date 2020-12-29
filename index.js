const winston = require("winston");
const express = require("express");
const {host, port} = require("./app/config")
let app = express();



(async function() {
    //Logging
    require("./app/logging")();
    
    //Routes
    require("./app/routes")(app);
    
    // Initialize Cache
    require("./database/redis").redisMainConnection.init()
    await require("./services/admin-service").updateCash()

    // Initiate the server on the selected host:port
    app.listen(port, host, () => winston.info(`Server started as ${process.env.NODE_ENV} on ${host}:${port}`));
	
})();