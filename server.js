require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

const port = process.env.PORT

// middlewares:
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// REST API routes:
app.use("/api", require("./api"))




// express server:
app.listen(port, () => console.log(`Server listening on PORT:${port}`))