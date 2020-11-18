// Modules
// DB Connections
const { MySqlConnection } = require("../database/mysql")
const { OracleConnection } = require("../database/oracle")
const { redisMainConnection } = require("../database/redis");
// Services
const {MapsServices } = require("../services/maps-service")
const {AdminServices } = require("../services/admin-service")
// Helpers
const {MapsHelper } = require("../helpers/maps-helper");

//------------------------
class MapsController {
  constructor(mysqlConnection = null, oracleConnection = null, redisConnection=null) {
    this.mysqlConnection = mysqlConnection || new MySqlConnection();
    this.oracleConnection = oracleConnection || new OracleConnection();
    this.redisConnection = redisConnection || redisMainConnection;
  }
  async destructor() {
    await this.mysqlConnection.destructor()
    await this.oracleConnection.destructor()
  }

  async getAllReps() {
    await this.mysqlConnection.init();
    let govs = await new AdminServices(this.mysqlConnection.client, null, null).getAllGovs();
    if (!govs) return { result: 'No Governorates !', code: 404 };

    let rep, reps = []
    for (let gov of govs) {
      rep = await this.getRepsOfGov(gov.gov_code);
      
      if (rep.code == 200) reps.push({ gov_code: gov.gov_code, reps: rep.result })
    }

    if (!(reps && reps.length)) return { result: "No registered representatives locations for this governorate", code: 404 }
    
    return {result: reps, code: 200};
  }

  async getCashedAllReps() {
    await this.mysqlConnection.init();
    let govs = await new AdminServices(this.mysqlConnection.client, null, null).getAllGovs();
    if (!govs) return { result: 'No Governorates !', code: 404 };
    
    var govRep, reps = [];
    for (let gov of govs) {
      govRep = await this.getCashedRepsOfGov(gov.gov_code)
      if (govRep.code == 200) {
        reps = Array.prototype.concat(reps, govRep.result);
      }  
    }

    if (!(reps && reps.length)) return { result: "No registered representatives !", code: 404 }
    
    return {result: reps, code: 200};
  }
  
  async getRepsOfGov(gov_code) {
    await this.mysqlConnection.init();
    await this.oracleConnection.init();
    let mapsSI = new MapsServices(this.mysqlConnection.client, this.oracleConnection.client)
    
    let reps = await mapsSI.getRepsOfGov(gov_code)
    if (!reps) return { result: 'No registered representatives for this governorate', code: 404 };
    
    let repsData = [];
    for (let [index, rep] of reps.entries()) {
      let merchs = await mapsSI.getMerchsCodes(rep.rep_code);
      if (!merchs || merchs.length > 999) continue;
     
      merchs = await mapsSI.getMerchsLocations(merchs)
      if (!merchs) continue;
      
      rep.location = new MapsHelper().polygonAverage(merchs)
      index % 2  ? rep.status = "#2ECC71" : rep.status = "#f08a5d"
      
      repsData.push(rep) 
    };

    if (!(repsData && repsData.length)) return {result: "No registered representatives locations for this governorate", code: 404}
    
    return {result: repsData, code: 200};
  }
  async getCashedRepsOfGov(gov_code) {
    let reps = await new MapsServices(null, null, this.redisConnection).getCashedRepsOfGov(gov_code)
    if (!(reps && reps.length)) return { result: "No registered representatives locations for this governorate", code: 404 }
    
    return {result: reps, code: 200};
  }

  async getMerchsOfReps(rep_code) {
    await this.mysqlConnection.init();
    await this.oracleConnection.init();
    let mapsSI = new MapsServices(this.mysqlConnection.client, this.oracleConnection.client)
    
    let merchsCodes = await mapsSI.getMerchsCodes(rep_code);
    if (!merchsCodes) return { result: 'No registered merchants for this representative', code: 404 };
    
    return await this.getLocationsOfMerchs(merchsCodes)
  }

  async getMerchsOfGovs(gov_code) {
    await this.oracleConnection.init();
    let mapsSI = new MapsServices(this.mysqlConnection.client, this.oracleConnection.client)

    let merchs = await mapsSI.getGovMerchsLocations(gov_code);
    if (!merchs) return { result: 'No registered merchants locations for this governorate', code: 404 };

    merchs = new MapsHelper().formatMerchant(merchs)
    
    return { result: merchs, code: 200} ;
  }

  async getLocationsOfMerchs(merchs_codes) {
    await this.oracleConnection.init();
    let merchs = await new MapsServices(null, this.oracleConnection.client, null).getMerchsLocations(merchs_codes)
    if (!merchs) return { result: 'No registered merchants locations for this representative', code: 404 };
    
    merchs = new MapsHelper().formatMerchant(merchs)
    return { result: merchs, code: 200} ;
  }
}

module.exports.MapsController = MapsController;