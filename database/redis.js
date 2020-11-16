const redis = require('redis')
const { redis_config} = require("../app/config")
const { promisify } = require("util");

function redisConnect(config) {
    return redis.createClient(config)
}
function redisClose(client) {
    client.end()
}

function redisPromisifier(client) {
    client.set = promisify(client.set).bind(client);
    client.get = promisify(client.get).bind(client);
    client.hset = promisify(client.hset).bind(client);
    client.hmset = promisify(client.hmset).bind(client);
    client.hget = promisify(client.hget).bind(client);
    client.hgetall = promisify(client.hgetall).bind(client);
}


class Redis{
    constructor(){
        this.client = null;

    };
    init() {
        if (!this.client)  {
            this.client = redisConnect(redis_config)
            redisPromisifier(this.client)
        }
        
    }
    destructor() {
        if (this.client) {
            redisClose(this.client)
            this.client = null;
        }
    }
    async setJson(key, value) {
        return await this.client.set(key, value)
    };

    async getJson(key) {
        return await this.client.get(key)
    };

    async setHash(hash, key, value) {
        return await this.client.hset(hash, key, value) 
    };

    async mSetHash(hash, entries) {
        return await this.client.hmset(hash, entries)
    };
    
    async getHash(hash, key) {  
        return await this.client.hget(hash, key)
    }
    async getAllHash(hash) {
        return await this.client.hgetall(hash);
    }
}



module.exports.redisMainConnection = new Redis();
module.exports.Redis = Redis