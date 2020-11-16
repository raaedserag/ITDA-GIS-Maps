// Import Modules
const express = require("express");
// Import Middlewares
const error = require("../middlewares/error");
//const authentication = require("../middlewares/authentication");
//const webConfig = require("../Middlewares/");

// Import Routes
// Maps Routes
const homeRoute = require("../routes/home-route")
const adminApi = require("../apis/admin-api")
const mapsApi = require("../apis/maps-api");


module.exports = function (app) {
  // Apply Essential Middlewares
  //app.use(webConfig);
  app.use(express.json({ limit: "50mb" })); // Reparse body of the request into json object
  app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Reparse url to encoded url payload
  app.use(express.static("public"))
 
  // Apply Morgan middleware in development mode
  if (process.env.NODE_ENV == "development") {
    app.use(require("morgan")("tiny"));
  }

  // Apply Routes
  app.use("/bi-api/admin", adminApi);
  app.use("/bi-api/maps", mapsApi);
  app.use("/", homeRoute)

  // Apply Error Middle ware
  app.use(error);
};
