import express from 'express'
import { checkPassword } from '../public/hash'
import { client } from '../server'


export const login = express.Router()


login.get('/', (req, res) => {
    res.redirect('signup.html')
})

login.post('/', async (req, res) => {

    try {
        const UserEmail = req.body.email;
        const password = req.body.password
        const checkIfAcExistedSQL = `SELECT * FROM USERS WHERE users.email = $1`;
        const users = (await client.query(checkIfAcExistedSQL, [UserEmail]));
        const user = users.rows[0];

        if (users.rowCount == 0) { // check if ac exist
            console.log("not exist")
            res.json({ success: false })
            return
        }
        if (user.is_banned){
            console.log('This is a banned user')
            res.json({success : false, message : 'banned'})
            return
        }
        const match = await checkPassword(password, user.password)
        if (match) {
            req.session["user"] = { ID: user.id, username: user.email }
            if(user.is_admin){
                req.session['adminStatus'] = true
            }else {
                req.session['adminStatus'] = false
            }
            res.json({ success: true, message: "A user login"})
        } else { // wrong password
            console.log('wrong password')
            res.status(400).json({ success: false, message: "Incorrect account or password" })
        }

    } catch (err) {
        console.error(err.message)
    } finally {
        console.log("Login Success")
    }

})