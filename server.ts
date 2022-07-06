import express from 'express'

//app declare
const app = express();
//import routers
import {login} from './router/login'
import {register} from './router/register'

app.get('/', (req, res)=> {
    res.send("main")
})

//Use Different Router
app.use('/login', login)
app.use('/register', register)



//Listening to Port 8080
const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`This server is currently listening at Port ${PORT}`)
})