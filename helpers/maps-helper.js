const { redis } = require("../database/redis")
module.exports.MapsHelper = class {
    constructor() {
    }
    polygonAverage = function (polygon) {
        let sumLat = 0, sumLong = 0;
        for (let index = 0; index < polygon.length; index++) {
            sumLat += +polygon[index].lat;
            sumLong += +polygon[index].long;
        }
        return { lat: (sumLat / polygon.length).toFixed(7), long: (sumLong / polygon.length).toFixed(7) };
    };

    formatMerchant = function (merchants) {
        for (let [index, merch] of merchants.entries()) {
            merch.location = { lat: merch.lat, long: merch.long }
            delete merch.lat
            delete merch.long
            index % 2  ? merch.status = "#3b6978" : merch.status = "#8d93ab"
        }
        return merchants;
    }
};
