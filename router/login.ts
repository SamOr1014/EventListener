import express from 'express'
import { checkPassword } from '../public/hash'
import { client } from '../server'


export const login = express.Router()


login.get('/', (req, res)=> {
    res.redirect('signup.html')
})

login.post('/', async (req, res)=> {

    try{
        const UserEmail = req.body.email;
        const password = req.body.password
        const checkIfAcExistedSQL = `SELECT * FROM USERS WHERE users.email = $1`;
        const users = (await client.query(checkIfAcExistedSQL,[UserEmail]));
        const user = users.rows[0];

        if (users.rowCount == 0) { // check if ac exist
            res.json({ success: false })
        } 

        const match = await checkPassword (password, user.password)
        if (match) {
            req.session["user"] = {ID: user.id, username:user.email}
            res.json({ success: true })
        } else { // wrong password
            res.status(400).json({ success: false, message: "Incorrect account or password" })
        }

    }catch (err){
        console.error(err.message)
    }finally {
        console.log("Final testing")
    }
    
})