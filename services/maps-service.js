// Modules
const oracledb = require("oracledb")
// Helpers
const { sequelizeBinds } = require("../helpers/sql-helper")

//------------------------
module.exports.MapsServices = class {
  constructor(mysqlClient=null, oracleClient=null, redisClient=null) {
    this.mysqlClient = mysqlClient;
    this.oracleClient = oracleClient;
    this.redisClient = redisClient;
  }
  
  async getRepsOfGov(gov_code) {
    let  repsCodes = await this.mysqlClient.query(`
    SELECT email AS rep_code, district_name
    FROM epayment2_production.users 
    WHERE role_id=6 AND gov_code=?;
    `, [gov_code])

    if (!(repsCodes[0] && repsCodes[0].length)) return null;
    return repsCodes[0];
  }

  async getCashedRepsOfGov(gov_code) {
    let result = await this.redisClient.getAllHash(`GOV:${gov_code}`)
    if (!result) return null;
    
    return Object.values(result).map((value) => JSON.parse(value).rep);
  }
  async findOneCashedRepOfGov(gov_code, rep_code) {
    return await this.redisClient.getHash(`GOV:${gov_code}`, `REP:${rep_code}`)
  }

  async getMerchsCodes(rep_code) {
    let merchCodes = await this.mysqlClient.query(`
    SELECT merchant_code AS merch_code
    FROM epayment2_production.merchants
    WHERE merchant_code IS NOT NULL AND manager=?
    `, [rep_code])

    if (!(merchCodes[0] && merchCodes[0].length)) return null;
    return merchCodes[0].map(x => x.merch_code)
  }

  async getMerchsLocations(merchsCodes) {
    let merchs = await this.oracleClient.execute(`
    SELECT damen_merchant_code AS "merch_code", x_coordinate AS "lat", y_coordinate AS "long"
    FROM smart_damen_owner 
    WHERE x_coordinate is not null AND y_coordinate is not null AND damen_merchant_code IN ${sequelizeBinds(merchsCodes.length)}
    `, merchsCodes, { outFormat: oracledb.OUT_FORMAT_OBJECT })
    if (!(merchs && merchs.rows && merchs.rows.length)) return null;
    return merchs.rows ;
  }

  async getGovMerchsLocations(govCode) {
    let merchs = await this.oracleClient.execute(`
    SELECT damen_merchant_code AS "merch_code", x_coordinate AS "lat", y_coordinate AS "long"
    FROM smart_damen_owner 
    WHERE x_coordinate is not null AND y_coordinate is not null AND governorate_code = ${govCode}
    `, [], { outFormat: oracledb.OUT_FORMAT_OBJECT })
    if (!(merchs && merchs.rows && merchs.rows.length)) return null;
    return merchs.rows ;
  }
}
