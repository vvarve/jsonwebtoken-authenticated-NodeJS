import express from "express";
import bodyParser from "body-parser";
import {roter} from "./utils/router.mjs"
import "./utils/condb.mjs"

const app = express()

app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use("/api", roter)

app.get("/signin", (req, res) => {
    res.sendFile(process.cwd() + "/templates/signin.html")
})


app.get("/signup", (req, res) => {
    res.sendFile(process.cwd() + "/templates/signup.html")
})

const listener = app.listen(3000, () => {
    console.log(` -------- the port ${listener.address().port} --------`) 
})