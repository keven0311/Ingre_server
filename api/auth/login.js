const router = require("express").Router();
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
  extractUserFromToken,
  isExpired,
} = require("../../utils/authUtils");
const {authenticateByUsernamePassword} = require("./middleware/authenticationMiddleware");

// model imports:
const { User } = require("../../db");

router.post("/",authenticateByUsernamePassword, async (req, res, next) => {
  try {
    const resMap = new Map();
    const currentToken = req.headers.authorization;
    const { username } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if(!currentToken){
        const token = generateToken(user)
        resMap.set("token",token)
    }else if (isExpired(currentToken) && verifyToken(currentToken)) {
        const refreshToken = generateRefreshToken(user);
        resMap.set("token",refreshToken)
    }

    resMap.set("user",user);
    console.log("resMap:",resMap)

    return res.status(200).json(Object.fromEntries(resMap))
  } catch (e) {
    res.status(400).send("Unauthorized");
    next(e);
  }
});

module.exports = router;
