var pm2Config; 
if (process.env.NODE_ENV == "production") pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
  }]
}

else if(process.env.NODE_ENV == "development")  pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
    node_args: '-r dotenv/config',
    env: {
      "NODE_ENV": "stage"
    }
  }]
}

else pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
    node_args: '-r dotenv/config',
    env: {
      "NODE_ENV": "stage"
    }
  }]
}
module.exports = pm2Config