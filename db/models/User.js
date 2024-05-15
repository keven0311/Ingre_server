const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  role:{
    type:Sequelize.ENUM('admin','user'),
    defaultValue:'user'
  },
  isSubscribed:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
  }
});

User.beforeCreate(async (user) => {
  const SALT_ROUND = 12;
  const hashPw = await bcrypt.hash(user.password, SALT_ROUND);
  user.password = hashPw;
});


User.prototype.validatePw = async function (pw) {
  const isValid = await bcrypt.compare(pw, this.password);
  return isValid;
};

module.exports = User;
