const Sequelize = require("sequelize");
const db = require("../config/db");

const RespondentOption = db.define(
    "tbl_respondent_options",
    {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement : true
        },
        answer_option : {type : Sequelize.STRING(255)},
        question_id : {type : Sequelize.INTEGER(11)},
        name : {type : Sequelize.STRING(255)}
    },
    {
        freezeTableName: true
    });
    
    module.exports = RespondentOption;