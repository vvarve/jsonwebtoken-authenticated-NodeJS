import { Router } from "express";
import  {User}  from "./schema.mjs";
import dotenv from "dotenv";
import Jwt  from "jsonwebtoken";
dotenv.config()
const payL = process.env.SECRET
export const roter = Router()

// MIDDLEWARE INSIDE WEB PAGE AUTH
const middleAuth = (req, res, next) => {
    const headerP = req.headers["www-authenticate"]
    if (!headerP) return res.status("401").json({auth0: false, key: "without header token"})
    const keyPrev = Jwt.verify(headerP, payL)
    if (!keyPrev) return res.status("401").json({auth0: false, key: "Unauthorized"})
    req.search = keyPrev.id
    next()
}

roter.post("/signup", async (req, res) =>{
    const {username, password, email} = await req.body;
    const user = new User ({
        username: username,
        password: password,
        email: email
})
    user.password = await user.enPassword(password)
   await user
        .save()
        .then(data => {
            const newKey = Jwt.sign({id: data._id, user: data.username, email: data.email}, payL, {expiresIn: "2h"})
            res.status("200").json({user: `${data.username} register succefully!`, auth0: true, key: newKey})
        })
        .catch(async data => {
            const finded = await User.findOne({}).select(data.keyValue)
            const value = finded.email ?? finded.username
                if(finded) return res.status("400").json({data: `${value} already exist!`})
            res.status("500").json({server: "status error 500"})  
        })
})


roter.get("/home", middleAuth, async (req, res) => {
    
    const user = await User.findOne({id: req.search}, {password: 0})
        .then(data => {
            res.status("200").json({authenticated: true})
        })
        .catch(data =>{
            res.status("400").json({authenticated: false})
        })
    
})

roter.post("/signin", async (req, res) =>{
    const {username, password} = req.body

    const user = await User.findOne({username: username})
    if (!user) return res.status("401").json({info: "user or password incorrect!"})

    const compare = await user.desPassword(password)
    if (!compare) return res.status("401").json({info: "user or password incorrect!!"})
    
    const newKey = Jwt.sign({id: user._id, user: user.username, email: user.email}, payL, {expiresIn: "2h"})
    res.status("200").json({user: `${user.username} register succefully!`, auth0: true, key: newKey})

})


