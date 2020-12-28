const itdaGovscodes = require("../samples/itda-govs.json").map(gov => gov.gov_code)
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
    },
    twirlConsole(text) {
        var P = ["|", "/", "-", "\\"];
        var x = 0;
        return setInterval(function() {
        process.stdout.write("\r" + text + P[x++]);
        x &= 3;
        }, 750);
  },
  getAllGovsCodes() { return itdaGovscodes}
};
