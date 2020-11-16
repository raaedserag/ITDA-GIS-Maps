module.exports.sequelizeBinds = function (count) {
    let sequelizedBinds = "("
    for (let i = 0; i < count; i++)
        sequelizedBinds += (i > 0) ? ", :" + i : ":" + i;
    return sequelizedBinds + ")"; 
}