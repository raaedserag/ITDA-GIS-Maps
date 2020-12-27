var pm2Config = {
  apps : [{
    name      : 'itdgis-api',
    script    : 'index.js',
  }]
}

module.exports = pm2Config