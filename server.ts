//######Trial only needa delete later
let loginStatus = false

import express from 'express'
import expressSession from 'express-session'
import formidable from 'formidable'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
// import path from 'path'

//database
export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})
client.connect();

//import routers
import {login} from './router/login'
import {register} from './router/register'
import {event} from './router/event'
import {account} from './router/account'
import {followers} from './router/followers'
import {search} from './router/search'
import {admin} from './router/admin'


//file upload route
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

//formidable parsing shit
export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') || false,
})

//app declare
const app = express(); 

//express-session
app.use(expressSession({
  secret: 'I am A Secret and you suck',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//Parse Multiform Data
app.use(express.urlencoded({ extended: true }))

//Parse Json
app.use(express.json())

//main page
app.get('/', (req, res)=> {
    res.redirect("index.html")
})
app.get('/main', (req, res)=> {
    res.send("main page")
})
app.get('/logout', (req, res)=> {
  loginStatus = false //replace by req.session["user"]
  res.redirect('/')
})
app.get('/status', (req, res)=> {
    res.json({loginStatus})
})

//Router can be used by Non-user
app.use('/register', register)
app.use('/search', search)
app.use('/login', login)

//Router can only be use by user
app.use('/event',event)
app.use('/account', account)
app.use('/followers', followers)
app.use('/admin', admin)


app.use(express.static('common-js'))
app.use(express.static('public'))
app.use(express.static('src'))
app.use(express.static('private'))

//Listening to Port 8080
const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`This server is currently listening at Port ${PORT}`)
})