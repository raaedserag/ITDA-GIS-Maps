// Import Modules
const express = require("express");
const router = express.Router()
const cors = require('cors');
// Import Middlewares
const error = require("../middlewares/error");
//const authentication = require("../middlewares/authentication");
//const webConfig = require("../Middlewares/");
const {api_prefix} = require("./config")

module.exports = function (app) {
  // Apply Essential Middlewares
  app.use(express.json({ limit: "50mb" })); // Reparse body of the request into json object
  app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Reparse url to encoded url payload
  app.use(express.static("public"))
  app.use(cors({
    exposedHeaders: 'x-auth-token',
  }));
 
  // Apply Morgan middleware in non-production mode
  if(process.env.NODE_ENV != "production") {
    app.use(require("morgan")("tiny"))
  };
  
  // Apply Routes
  Object.entries({
    "/admin": require("../apis/admin-api"),
    "/maps": require("../apis/maps-api"),
    "/": require("../routes/home-route")

  }).map((route=> app.use(api_prefix? `${api_prefix}${route[0]}` : route[0], route[1])))

  // Apply Error Middle ware
  app.use(error);
};
