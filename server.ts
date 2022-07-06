import express from 'express'

const app = express();


app.get('/', (req, res)=> {
    res.send("main")
})

//Use Different Router
// app.use()



//Listening to Port 8080
const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`This server is currently listening at Port ${PORT}`)
})