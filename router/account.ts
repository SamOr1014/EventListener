import express from 'express'
import {client} from '../server'

export const account = express.Router()

account.get('/', (req,res)=> {
    console.log('you request for you profile')
    res.redirect('user-account.html')
})

account.get('/userdetail', async (req, res)=> {
    const userID = 1 //later substitute by req.session["userID"]
    const userINFO = await client.query('SELECT * FROM users where id = $1', [userID])
    res.json(userINFO.rows[0])
})
account.get('/alluserdetail', async (req, res)=> {
    const userID = 1 //later substitute by req.session["userID"]
    const userINFO = await client.query('SELECT * FROM users where is_banned = false', [userID])
    res.json(userINFO.rows[0])
})

account.get('/created', (req,res)=> {
    console.log('you request for you created')
    res.redirect('user-created.html')
})

account.get('/privacy', (req, res)=> {
    console.log('you request for you privacy')
    res.redirect('user-privacy.html')
})

account.get('/request', (req, res)=> {
    console.log('you request for you request')
    res.redirect('request.html')
})

account.get('/joined', (req,res)=> {
    console.log('you request for you joined')
    res.redirect('user-created.html')
})

account.use(express.static('member'))
account.use(express.static('common-js'))
account.use(express.static('src'))