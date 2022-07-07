import express from 'express'

export const account = express.Router()

account.get('/profile', (req,res)=> {
    console.log('you request for you profile')
    res.redirect('account.html')
})

account.get('/created', (req,res)=> {
    console.log('you request for you created')
    res.redirect('user-created.html')
})

account.get('/privacy', (req, res)=> {
    console.log('you request for you privacy')
    res.redirect('user-privacy')
})


account.get('/joined', (req,res)=> {
    console.log('you request for you joined')
    res.redirect('user-created.html')
})



