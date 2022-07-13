import express from "express"
import { client } from "../server"
import { isLoggedin } from "../guard"
import { hashPassword } from '../public/hash';
export const account = express.Router()

account.get("/", (req, res) => {
  console.log("you request for you profile")
  res.redirect("user-account.html")
})

account.get("/userdetail", async (req, res) => {
  const userID = req.session["user"].ID //later substitute by req.session["userID"]
  const userINFO = await client.query("SELECT * FROM users where id = $1", [userID])
  res.json(userINFO.rows[0])
})
account.get("/alluserdetail", async (req, res) => {
  const allUserINFO = await client.query("SELECT * FROM users order by id asc")
  res.json(allUserINFO.rows)
})

account.get("/created", (req, res) => {
  console.log("you request for you created")
  res.redirect("user-created.html")
})

account.get("/privacy", (req, res) => {
  console.log("you request for you privacy")
  res.redirect("user-privacy.html")
})

account.get("/request", (req, res) => {
  console.log("you request for you request")
  res.redirect("request.html")
})

account.get('/request/detail', async(req, res)=> {
  const userid = req.session['user'].ID
  if (!userid){
    res.json({success : false, message: "failed"})
  }
  const reqUser = await client.query('select users_request.user_id, users_request.event_id, users.first_name, users.last_name, users.phone, events.name, users_request.id from users_request inner join users on users_request.user_id = users.id inner join events on users_request.event_id = events.id where users_request.organiser_id = $1 and processed = false order by users_request.id asc;',[userid])
  res.json(reqUser.rows)
})

account.get("/joined", (req, res) => {
  console.log("you request for you joined")
  res.redirect("user-joined.html")
})

account.put("/profile", async (req, res) => {
  let userid = req.session["user"].ID
  if(!userid){
    res.json({success: false, message: "Invalid UserID"})
    return
  }
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const phone = req.body.phone
  const birthday = req.body.birthday
  if (!firstName||!lastName||!phone||!birthday){
    res.json({success: false, message: "Invalid Information Provided! Please try again"})
    return
  }
  const bio = req.body.bio
  await client.query('update users set first_name = $1, last_name = $2, phone = $3, birthday = $4, bio = $5 where id = $6 ',[firstName, lastName, phone, birthday, bio, userid])
  res.json({success: true})
})
//user change password
account.put("/email", async(req, res)=> {
    let userid = req.session["user"].ID
    if(!userid){
        res.json({success: false, message: "Invalid UserID"})
        return
    }
    const newEmail = req.body.newEmail
    const confirmedEmail = req.body.confirmedEmail
    if(newEmail !== confirmedEmail){
        res.json({success: false, message: "Invalid Confirmed Email"})
        return
    }
    await client.query('update users set email = $1 where id = $2', [newEmail, userid])
    res.json({success: true})
})
//user change password
account.put("/password", async(req, res)=> {
    let userid = req.session["user"].ID
    if(!userid){
        res.json({success: false, message: "Invalid UserID"})
        return
    }
    const newPassword = req.body.newPw
    const confirmedPassword = req.body.confirmedPw
    if(newPassword !== confirmedPassword){
        res.json({success: false, message: "Invalid Confirmed Password"})
        return
    }
    const hashedpassword = await hashPassword(newPassword)
    await client.query('update users set password = $1 where id = $2', [hashedpassword, userid])
    res.json({success: true})
})

account.use(isLoggedin, express.static("member"))
account.use(express.static("common-js"))
account.use(express.static("src"))
