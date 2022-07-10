import express from 'express'
import { isLoggedinForExplore } from '../guard'
import type { Request, Response } from "express";
// import {client} from '../server'

export const explore = express.Router()

export async function getUserInfo(req: Request, res: Response) {
  try {
    const user = req.session["user"];
    const { id, ...others } = user;
    res.json({ success: true, user: others });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "No User " });
  }
}


explore.get('/getUser',isLoggedinForExplore, getUserInfo) // Check if login for explore


explore.use('/', (req, res) => {
  res.redirect('explore.html')
  console.log("Testing123")

})
