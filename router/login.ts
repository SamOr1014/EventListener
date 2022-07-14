import express from 'express'
import { checkPassword,hashPassword } from '../public/hash'
import { client } from '../server'
import crypto from "crypto";
import fetch from "cross-fetch";
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

async function loginGoogle(req: express.Request, res: express.Response) {
    const accessToken = req.session?.["grant"].response.access_token;
    const fetchRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await fetchRes.json();
    const users = (
      await client.query(`SELECT * FROM users WHERE users.email = $1`, [result.email])
    ).rows;
    let user = users[0];
    if (!user) {
      // Create the user when the user does not exist
      let tempPassword = crypto.randomBytes(20).toString("hex");
      let hashedPassword = await hashPassword(tempPassword);
  await client.query(`INSERT INTO users (last_name, first_name,gender,birthday,phone,email,password, is_Admin, is_banned) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [result.family_name, result.given_name, "F", "1989-06-04", "60789581", result.email, hashedPassword,false,false])
    }
    if (req.session) {
        req.session["user"] = { ID: user.id, username: user.email }
    }
    res.redirect("/")
  }

login.get("/google", loginGoogle);