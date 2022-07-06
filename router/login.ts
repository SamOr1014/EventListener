import express from 'express'

export const login = express.Router()

login.post('/', (req, res)=> {
    console.log("You posted to route Login")
    res.send("Login")
})