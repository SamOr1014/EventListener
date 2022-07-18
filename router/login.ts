import express from "express"
import { checkPassword, hashPassword } from "../public/hash"
import { client } from "../server"
import crypto from "crypto"
import fetch from "cross-fetch"
import { LoginForm, loginSchema } from "../schemas/user.schema"
import { validateMiddleware } from "../validate"
import { StatusCodes } from "http-status-codes"
import { User } from "../models"

export const login = express.Router()

login.get("/", (req, res) => {
  res.redirect("signup.html")
})

const asyncWrapper =
  (fn: (req: express.Request, res: express.Response) => Promise<void>) =>
  async (req: express.Request, res: express.Response) => {
    try {
      await fn(req, res)
    } catch (err) {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "internal server error" })
    }
  }

login.post("/", validateMiddleware(loginSchema), asyncWrapper(loginRouteHandler))
login.get("/google", loginGoogle)

async function loginRouteHandler(req: express.Request, res: express.Response) {
  const value: LoginForm = req.body

  const checkIfAcExistedSQL = `SELECT * FROM USERS WHERE users.email = $1`
  const users = await client.query<User>(checkIfAcExistedSQL, [value.email])
  const user = users.rows[0]

  if (users.rowCount == 0) {
    // check if ac exist
    console.log("not exist")
    res.json({ success: false })
    return
  }

  if (user.is_banned) {
    console.log("This is a banned user")
    res.json({ success: false, message: "banned" })
    return
  }

  const match = await checkPassword(value.password, user.password)
  if (match) {
    req.session["user"] = { ID: user.id, username: user.email, adminStatus: user.is_admin }
    res.json({ success: true, message: "A user login" })
  } else {
    console.log("wrong password")
    res.status(400).json({ success: false, message: "Incorrect account or password" })
  }
}

async function loginGoogle(req: express.Request, res: express.Response) {
  const accessToken = req.session?.["grant"].response.access_token
  const fetchRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    method: "get",
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const result = await fetchRes.json()
  const users = (await client.query(`SELECT * FROM users WHERE users.email = $1`, [result.email]))
    .rows

  let user = users[0]
  if (!user) {
    // Create the user when the user does not exist
    let tempPassword = crypto.randomBytes(20).toString("hex")
    let hashedPassword = await hashPassword(tempPassword)
    await client.query(
      `INSERT INTO users (last_name, first_name,gender,birthday,phone,email,password, is_Admin, is_banned) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        result.family_name,
        result.given_name,
        "F",
        "1989-06-04",
        "60789581",
        result.email,
        hashedPassword,
        false,
        false,
      ]
    )
  }

  if (req.session) {
    const user = await client.query(`select * from users where email = $1;`, [result.email])
    req.session["user"] = { ID: user.rows[0].id, username: user.rows[0].email }
  }
  res.redirect("/")
}
