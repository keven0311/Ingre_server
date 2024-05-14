require('dotenv').config()
const Sequelize = require("sequelize")
const dbName = process.env.DATABASE_NAME

const db = new Sequelize(`postgres://localhost:5432/${dbName}`,{
    logging: false
})

module.exports = db