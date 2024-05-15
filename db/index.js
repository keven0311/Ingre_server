const db = require("./database")

// Importing models:
const Test = require("./models/Test")
const User = require("./models/User")


// Models associations assigning:
    // User.hasMany(Order)


module.exports = {
    db,
    Test,
    User
}