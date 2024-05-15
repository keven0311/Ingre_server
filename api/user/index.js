const router = require("express").Router();
const {
  authenticateByToken,
} = require("../auth/middleware/authenticationMiddleware");
const { extractUserFromToken } = require("../../utils/authUtils");

const { User } = require("../../db");

router.get("/", authenticateByToken, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userFromToken = extractUserFromToken(token);
    console.log("GET route token:", token);
    console.log("GET route userFromToken", userFromToken);
    const user = await User.findOne({
      where: {
        username: userFromToken.username,
      },
    });
    console.log("GET route user:", user);
    if (!user) return res.stauts(404).send({ message: "User not found!" });
  } catch (e) {
    res.status(404).send({
      message: "User not found!",
    });
    next(e);
  }
});

module.exports = router;
