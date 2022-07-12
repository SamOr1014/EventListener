import express from 'express'
import { client } from "../server"
export const comment = express.Router()
let dateTime = new Date()

comment.post("/", async (req,res) => {
    try {
        const comment = req.body.comment
        const eventID = req.body.eventID
        const userId = req.session["user"].ID

        const postCommentSql = `INSERT INTO event_comment (event_id,user_id,comment,created_at) values ($1,$2,$3,$4)`
        await client.query(postCommentSql,[eventID,userId,comment,dateTime])
    } catch (err) {
        console.error (err.message)
    } finally {
        res.json({success:true})
    }
})