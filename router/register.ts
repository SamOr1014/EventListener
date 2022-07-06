import express from 'express'

export const register = express.Router()

register.post('/', (req, res)=> {
    console.log("You have posted to Register")
    res.send("Registered")
})
