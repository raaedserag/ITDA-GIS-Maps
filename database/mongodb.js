// Using ES6 imports
const winston = require("winston")
const mongoose = require("mongoose")
const uri = require("../App/config").mongo_config.uri

module.exports.connectMongo = async function () {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
          })
      winston.info(`Connected to Cluster DB successfully`)
    } catch (error) {
      winston.info(`Connection to Cluster DB failed: ${error} \n Reconnecting...`);
      setTimeout(await this.connectMongo(), 5000);
    }
  };