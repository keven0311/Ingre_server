require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { User } = require("../../../db")
const { where } = require("sequelize")

const tokenHeader = process.env.JWT_TOKEN_HEADER_KEY
const secret = process.env.JWT_SECRET_KEY

const authenticateByToken = async (req,res,next) => {
    const token = req.headers.authorization
    try {
        const decoded = await jwt.verify(token, secret);
        next();
    } catch (err) {
        return res.status(403).json({ message: "Failed to authenticate token!" });
    }
}

const authenticateByUsernamePassword = async (req,res,next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPw = await bcrypt.compare(password, user.password);
        if (!isValidPw) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        req.user = user
        next();
    } catch (error) {
        console.error("Error in authenticateByUsernamePassword middleware:", error.message);
        next(error);
    }
}

module.exports = {
    authenticateByToken,
    authenticateByUsernamePassword
}