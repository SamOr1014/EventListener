import express from 'express'
import expressSession from 'express-session'
import formidable from 'formidable'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'

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

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

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
  cookie: { secure: true }
}))

//Parse Multiform Data
app.use(express.urlencoded({ extended: true }))

//Parse Json
app.use(express.json())

//main page
app.get('/', (req, res)=> {
    res.send("main")
})

//Use Different Router
app.use('/login', login)
app.use('/register', register)
app.use('/event',event)
app.use('/account', account)
app.use('/followers', followers)

app.use(express.static('public'))
account.use(express.static('member'))
app.use(express.static('private'))
//Listening to Port 8080
const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`This server is currently listening at Port ${PORT}`)
})