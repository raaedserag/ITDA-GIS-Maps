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
    user     : process.env.ITDA_MAPS_ORACLE_USER,
    password : process.env.ITDA_MAPS_ORACLE_PASS,
    dbName: config.get("oracle_dbName"),
    lookupName: config.get("oracle_lookupName"),
    connectString: `${config.get("oracle_host")}/${config.get("oracle_dbSchema")}`,
  }
}
