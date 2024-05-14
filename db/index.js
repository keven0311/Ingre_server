const db = require("./database")

// Importing models:
const Test = require("./models/Test")


// Models associations assigning:
    // User.hasMany(Order)


module.exports = {
    db,
    Test
}