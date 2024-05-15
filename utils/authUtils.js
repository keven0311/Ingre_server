const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET_KEY

function generateToken(user){
    const payload = {
        username:user.username,
        role:user.role,
        isSubscribed:user.isSubscribed,
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"});
}

function generateRefreshToken(user){
    const payload = {
        username:user.username,
        role:user.role,
        isSubscribed:user.isSubscribed,
    }
    return jwt.sign(payload, secret,{expiresIn:"2h"});
}

function verifyToken(token){
    return jwt.verify(token,secret);
}

function isExpired(token){
    try {
        const decoded = jwt.verify(token,secret)
        const expirationTime = decoded.exp * 1000
        const currentTime = Date.now()
        return currentTime > expirationTime
    } catch (e) {
        return true
    }
}

function extractUserFromToken(token){
    try {
        const decoded = jwt.verify(token,secret);
        return decoded
    } catch (e) {
        return null;
    }
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    extractUserFromToken,
    isExpired
}