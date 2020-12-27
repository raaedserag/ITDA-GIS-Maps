module.exports = {
    office_formatter(offices) {
        for (let [index, office] of offices.entries()) {
            office.location = { lat: office.lat, long: office.long }
            delete office.lat
            delete office.long
        }
        return offices;
    },
    sequelizeBinds(count) {
        let sequelizedBinds = "("
        for (let i = 0; i < count; i++)
            sequelizedBinds += (i > 0) ? ", :" + i : ":" + i;
        return sequelizedBinds + ")"; 
    }
};
