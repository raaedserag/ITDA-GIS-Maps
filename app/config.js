const config = require("config")
module.exports = {
  api_prefix: config.get("api_prefix"),
  host: config.get("host"),
  port: config.get("port"),
  redis_config: {
    host: config.get("redis_host"),
    port: config.get("redis_port")
  },
  oracle_config: {
    user: process.env.DAMEN_MAPS_ORACLE_USER,
    password: process.env.DAMEN_MAPS_ORACLE_PASS,
    connectString : `${config.get("oracle_host")}/${process.env.DAMEN_MAPS_ORACLE_DB}`,
    events: true
  },
  mySql_config: {
    host     : config.get("mysql_host"),
    user     : process.env.DAMEN_MAPS_MYSQL_USER,
    password : process.env.DAMEN_MAPS_MYSQL_PASS,
    database : process.env.DAMEN_MAPS_MYSQL_DB
  },
  mongo_config: {
    uri: process.env.DAMEN_MAPS_MONGO_URI
  }
}
