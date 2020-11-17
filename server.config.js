var pm2Config; 
if (process.env.NODE_ENV == "production" || "dev-prod") pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
  }]
}


else pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
    node_args: '-r dotenv/config'
  }]
}
module.exports = pm2Config