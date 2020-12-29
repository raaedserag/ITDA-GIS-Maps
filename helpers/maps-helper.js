const itdaGovscodes = require("../samples/itda-govs.json").map(gov => gov.gov_code)
module.exports = {
    office_formatter(offices) {
        for (let [index, office] of offices.entries()) {
            office.location = { lat: office.lat, long: office.long }
            if(office.revenues) office.revenues = office.revenues.toFixed(2)
            delete office.lat
            delete office.long
        }
        return offices;
    },
    lookups_formatter(lookups){
        let formattedLookup = {}
        // Format retreived objects
        lookups.map(lookup => formattedLookup[lookup[0]]=lookup[1] )


        return formattedLookup;
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
