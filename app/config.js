const config = require("config")
module.exports = {
  api_prefix: config.get("api_prefix"),
  host: config.get("host"),
  port: config.get("port"),
  redis_config: {
    host: config.get("redis_host"),
    port: config.get("redis_port")
  },
  mySql_config: {
    host     : config.get("mysql_host"),
    user     : process.env.DAMEN_MAPS_MYSQL_USER,
    password : process.env.DAMEN_MAPS_MYSQL_PASS,
    database : config.get("mysql_dbName")
  },
}
