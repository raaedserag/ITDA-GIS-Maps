const oracledb = require('oracledb');
const {oracle_config} = require("../app/config")

module.exports.OracleConnection = class {
    constructor() {
        this.client = null;
    }
    async init() {
        if (!this.client) {
            this.client = await oracledb.getConnection(oracle_config)
        }
    } 
    async destructor() {
        if (this.client) {
            await this.client.close()
            this.client = null;
        }
    }
};