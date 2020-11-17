const config = require("config")
module.exports = {
  host: config.get("host"),
  port: config.get("port"),
  api_host: config.get("api-host"),
  redis_config: {
    host: config.get("redis_host"),
    port: config.get("redis_port")
  },
  oracle_config: {
    user: process.env.DAMEN_ORACLE_USER,
    password: process.env.DAMEN_ORACLE_PASS,
    connectString : `${config.get("oracle_host")}/${process.env.DAMEN_ORACLE_DB}`,
    events: true
  },
  mySql_config: {
    host     : config.get("mysql_host"),
    user     : process.env.DAMEN_MYSQL_USER,
    password : process.env.DAMEN_MYSQL_PASS,
    database : process.env.DB
  },
  mongo_config: {
    uri: process.env.DAMEN_MONGO_URI
  }
}
