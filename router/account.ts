import express from 'express'
import {client} from '../server'

export const account = express.Router()

account.get('/', (req,res)=> {
    console.log('you request for you profile')
    res.redirect('user-account.html')
})

account.get('/userdetail', async (req, res)=> {
    console.log(req.query)
    const userID = req.query.userid
    const userINFO = await client.query('SELECT * FROM users where id = $1', [userID])
    console.log(userINFO.rows[0])
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



