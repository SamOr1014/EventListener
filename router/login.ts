import express from 'express'

export const login = express.Router()


login.get('/', (req, res)=> {
    res.redirect('signup.html')
})

login.post('/', (req, res)=> {
    console.log("You posted to route Login")
    req.session["userStatus"] = true
    console.log(req.session["userStatus"])
    res.send("Login")
})