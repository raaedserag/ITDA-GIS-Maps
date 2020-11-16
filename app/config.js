const config = require("config")
module.exports = {
  host: config.get("host"),
  port: config.get("port"),
  redis_config: {
    host: config.get("redis_host"),
    port: config.get("redis_port")
  },
  oracle_config: {
    user: process.env.DAMEN_ORACLE_USER,
    password: process.env.DAMEN_ORACLE_PASS,
    connectString : process.env.DAMEN_ORACLE_URI,
    events: true
  },
  mySql_config: {
    host     : process.env.DAMEN_MYSQL_HOST,
    user     : process.env.DAMEN_MYSQL_USER,
    password : process.env.DAMEN_MYSQL_PASS,
    database : process.env.DB
  },
  mongo_config: {
    uri: process.env.DAMEN_MONGO_URI
  }
}
