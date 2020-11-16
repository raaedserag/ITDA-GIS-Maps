const mongoose = require("mongoose")
const { pointSchema } = require("./geo-model")

const merchantSchema = new mongoose.Schema({
  merch_code: {
    type: Number,
    required: true
  },
  rep_code: {
    type: String,
    required: true
  },
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere'
    }
  });

module.exports.Merchant = mongoose.model('Merchant', merchantSchema)