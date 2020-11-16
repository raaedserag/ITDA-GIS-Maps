const winston = require("winston");

module.exports = function (err, req, res, next) {
  //winston.error(err.message, err);
  winston.error(err.message)
  res.status(500).send(`Internal server error:\n${err.message}`);
};
