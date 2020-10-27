const Sequelize = require("sequelize");
const db = require("../config/db");

const Question = db.define(
"tbl_question",
{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey : true,
        autoIncrement : true
    },
    question : {type : Sequelize.STRING(255)},
    allownoneoftheabove : {type : Sequelize.BOOLEAN},
    shuffletheorder : {type : Sequelize.BOOLEAN}
},
{
    freezeTableName: true
});

module.exports = Question;