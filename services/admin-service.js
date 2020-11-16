module.exports.AdminServices = class {
  constructor(mysqlClient, oracleClient, redisClient) {
    this.mysqlClient = mysqlClient;
    this.oracleClient = oracleClient;
    this.redisClient = redisClient;
  }
  async getAllGovs() {
    let govCodes = await this.mysqlClient.query(`
    SELECT gov_code, name AS "en_name"
    FROM epayment2_production.governorates
    WHERE gov_code NOT IN(0, 99) AND gov_code IS NOT null; 
    `, [])
    if (!(govCodes[0] && govCodes.length)) return null;
    return govCodes[0];
  }

  async cashGovReps(gov_code, reps) {
    let entries = []
    for (let rep of reps) {
      entries.push(`REP:${rep.rep_code}`)
      entries.push(JSON.stringify({rep}))
    }
    let result = await this.redisClient.mSetHash(`GOV:${gov_code}`, entries)
    return result;
  }
  
}
