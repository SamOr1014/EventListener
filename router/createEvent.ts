import express from 'express'
// import { client } from '../server'



export const createEvent = express.Router()

createEvent.use("/", (req, res) => {
  if (req.session["user"]) {
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
});