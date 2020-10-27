const Sequelize = require("sequelize");
const db = new Sequelize("populixbackendtest","root","root", {
    host:"localhost",
    dialect:"mysql",
    operatorAliases:false
});

db.sync({});

module.exports = db;