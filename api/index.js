const router = require("express").Router();

// api routes:
router.use("/test", require("./test"));
router.use("/login", require("./auth/login"));
router.use("/signup",require("./auth/signup"));
router.use("/user", require("./user"))


// general error handling:
router.use((req,res,next) => {
    const err = new Error("API route not found.");
    err.status = 404;
    next(err);          
})

module.exports = router;