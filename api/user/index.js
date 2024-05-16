const router = require("express").Router();
const { authenticateByToken } = require("../auth/middleware/authenticationMiddleware");
const { extractUserFromToken } = require("../../utils/authUtils");

const { User } = require("../../db");

router.get("/", authenticateByToken, async (req, res, next) => {
  try {
    const resMap = new Map();
    const token = req.headers.authorization;
    const userFromToken = extractUserFromToken(token);
    
    const user = await User.findOne({
      where: {
        username: userFromToken.username,
      },
    });
    resMap.set("message","GET user successful")
    resMap.set("user",user)

    return res.status(200).send(Object.fromEntries(resMap))
  } catch (e) {
    console.error(e.message)
    res.status(404).send({
      message: e.message,
    });
    next(e);
  }
});

module.exports = router;
