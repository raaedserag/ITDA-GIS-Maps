const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  // catch an uncaughtException in a file
  new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })


  // catch an unhandled rejection
  process
    .on("unhandledRejection", (ex) => {
    throw ex;
    })
    .on('SIGTERM', function () {
      process.exit(0);
    })
    .on('SIGINT', function() {
        process.exit(0);
    });
  
  // use a log file and a database to log errors.
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  //  Use Console logging in non-production mode only
  if(process.env.NODE_ENV != "production") {
    winston.add(
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );
  };

};
