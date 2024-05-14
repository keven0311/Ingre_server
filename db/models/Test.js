const Sequelize = require("sequelize")
const db = require("../database")

// Define Sequelize model:
const Test = db.define("test",{
    name_test:{
        type: Sequelize.STRING
    },
    email_test:{
        type: Sequelize.STRING
    }
})

module.exports = Test;