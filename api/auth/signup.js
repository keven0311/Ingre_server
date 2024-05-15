const router = require("express").Router();
const { generateToken } = require("../../utils/authUtils")


// model imports:
const { User } = require("../../db");


// API routes:
// Parent endpoint --> "/api/signup"
router.post("/",async (req,res,next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({
            where:{
                username:username
            }
        })
        if(user) return res.status(409).send("Username already exist");
        
        const newUser = await User.create(req.body);
        const token = generateToken(newUser.dataValues);

        return res.status(201).send({
            message:"User created",
            user:newUser,
            token:token
        })
    } catch (e) {
        res.status(500).send("Internal server error.");
        next(e)
    }
})

module.exports = router