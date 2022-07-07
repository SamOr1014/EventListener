import express from 'express'
import { client } from '../server'
import { hashPassword } from '../public/hash';

export const register = express.Router()



register.get('/', (req, res) => {
    res.redirect('signup.html')
})

register.post('/', async (req, res) => {

    try {
        console.log("Testing")
        const last_name = req.body.LastName;
        const first_name = req.body.FirstName;
        const gender = req.body.Gender;
        const birthday = req.body.DOA;
        const Phone = req.body.Phone as string;
        const Email = req.body.Email;
        const password = req.body.password as string;
        const isAdmin = req.body.isAdmin 

        const FindifExistedSQL = `SELECT * FROM USERS WHERE users.email = $1`

        let newAc = await client.query(FindifExistedSQL, [Email])
        console.log(newAc.rowCount)

        // If email used, send message to js
        if (newAc.rowCount > 0) {
            res.json({ success: false })
        } else {
            const hashedpassword = await hashPassword(password);
            const SaveAcSql = `INSERT INTO users (last_name, first_name,gender,birthday,phone,email,password, is_Admin) values ($1,$2,$3,$4,$5,$6,$7,$8)`
            await client.query(SaveAcSql, [last_name, first_name, gender, birthday, Phone, Email, hashedpassword,isAdmin])
            res.json({ success: true })
        }
    }
    catch (err) {
        console.error(err.message)
    } finally {
        console.log('Final testing')
    }

})
