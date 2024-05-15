const express = require("express")
const router = express.Router()

// db imports:
const { Test } = require("../db")

router.get("/", async (req,res,next) => {
    try {
        const testRes = await Test.findAll()
        res.send(testRes);
    } catch (e) {
        res.status(400).send("Somthing wrong!")
        next(e)
    }
})

module.exports = router