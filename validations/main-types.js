const Joi = require('joi');

const CustomTypes = {
}


const RefTypes = {
    id: Joi.number().min(1).required(),
    govCode: Joi.number().integer().min(1).max(40),
}

module.exports = {
    CustomTypes,
    RefTypes
}