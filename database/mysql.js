const mysql = require('mysql2/promise');
const { mySql_config} = require("../app/config")
module.exports.MySqlConnection = class {
    constructor() {
        this.client = null;
    }
    async init() {
        if (!this.client) {
            this.client = await mysql.createConnection(mySql_config);
        }
    }
    async destructor() {
        if (this.client) {
            await this.client.end();
            this.client = null;
        }
    }
};

