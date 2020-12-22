var pm2Config = {
  apps : [{
    name      : 'BI-Locations',
    script    : 'index.js',
  }]
}

module.exports = pm2Config