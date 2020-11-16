// DB Connections
const { MySqlConnection } = require("../database/mysql")
const { OracleConnection } = require("../database/oracle")
const { redisMainConnection } = require("../database/redis");
// Services & Controllers
const {AdminServices} = require("../services/admin-service")
const { MapsController } = require("./maps-controller")

//------------------------
module.exports.AdminController = class {
  constructor(mysqlConnection = null, oracleConnection = null, redisConnection=null) {
    this.mysqlConnection = mysqlConnection || new MySqlConnection();
    this.oracleConnection = oracleConnection || new OracleConnection()
    this.redisConnection = redisConnection || redisMainConnection 
  }
  async destructor() {
    await this.mysqlConnection.destructor()
    await this.oracleConnection.destructor()
  }

  async cacheAllGovsReps() {
    await this.mysqlConnection.init();
    await this.oracleConnection.init();

    let govs = await new AdminServices(this.mysqlConnection.client, this.oracleConnection, this.redisConnection).getAllGovs()
    if (!govs) return { result: 'No Governorates !', code: 404 };

    let result = []
    for (let gov of govs) {
      result.push({ gov_code: gov.gov_code, status: await this.cashGovReps(gov.gov_code)})
    }

    if (!(result && result.length)) return { result: "No registered representatives locations for all governorates !", code: 404 }
    
    return {result, code: 200};
  }

  async cashGovReps(gov_code) {
    await this.mysqlConnection.init();
    await this.oracleConnection.init();

    let getReps = await new MapsController(this.mysqlConnection, this.oracleConnection).getRepsOfGov(gov_code)
    if (getReps.code != 200) return getReps;

    let cashResult = await new AdminServices(this.mysqlConnection, this.oracleConnection, this.redisConnection)
      .cashGovReps(gov_code, getReps.result)
    
    return {result: cashResult, code: 200}
  }
}
