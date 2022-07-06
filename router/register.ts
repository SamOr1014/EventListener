import express from 'express'

export const register = express.Router()

register.get('/', (req, res)=> {
    res.redirect('signup.html')
})


register.post('/', (req, res)=> {
    console.log("You have posted to Register")
    res.send("Registered")
})
