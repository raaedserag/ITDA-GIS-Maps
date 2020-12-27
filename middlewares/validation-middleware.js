const Joi = require('joi');
const _ = require("lodash")

const { CustomTypes, RefTypes} = require("../validations/main-types") 
    
    
module.exports.JoiValidator = class {
    constructor(validationKey = []) {
        let mappedKeys = {}
        validationKey.map(key => {
            key = (typeof key == 'string') ? [key] : Object.entries(key)[0]
            mappedKeys[`${key[0]}`] = (key.length == 1) ?
                CustomTypes[key[0]]
                : RefTypes[key[1]]
        })
        this.schema = Joi.object(mappedKeys)
        return (req, res, next) => {
            if (req.query) {
                Object.assign(req.body, req.query)
            }
            let { value, error } = this.schema.validate(req.body);
            if (error) return res.status(400).send(error.message);
            if (value){
                req.body = value;
                next();
            }
        }
    }
}