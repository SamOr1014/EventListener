import express from 'express'
import {client} from '../server'
import {isLoggedinForExplore} from '../guard'
export const account = express.Router()
import type { Request, Response } from "express";

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
    const allUserINFO = await client.query('SELECT * FROM users')
    res.json(allUserINFO.rows)
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

export async function getUserInfo(req: Request, res: Response){
    try {
      const user = req.session["user"];
      const { id, ...others } = user;
      res.json({ success: true, user: others });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "internal server error" });
    }
  }
  
account.get('/getUser', isLoggedinForExplore, getUserInfo ) // Check if login for explore
