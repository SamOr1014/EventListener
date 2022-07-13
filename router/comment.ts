import express from 'express'
import { client } from "../server"
export const comment = express.Router()

comment.post("/", async (req,res) => {
    try {
        const comment = req.body.comment
        const eventID = req.body.eventID
        const userId = req.session["user"].ID

        const postCommentSql = `INSERT INTO event_comment (event_id,user_id,comment,created_at) values ($1,$2,$3,now())`
        await client.query(postCommentSql,[eventID,userId,comment])
    } catch (err) {
        console.error (err.message)
    } finally {
        res.json({success:true})
    }
})

comment.get("/", async (req,res) => {
    try {
        const eventid = req.query.eventid
        const commentSQL = 
        `SELECT t1.comment,t1.created_at, t2.last_name, t2.first_name from event_comment as t1 INNER JOIN users as t2 
        on t1.user_id = t2.id WHERE t1.event_id = $1 ORDER BY t1.created_at DESC `
        const results = await client.query(commentSQL,[eventid])
        const result = results.rows
        if (results.rowCount > 0 ) {
            res.json({result,success:true})
        } else {
            res.json({success:false})
        }
        
    }catch (err) {
        console.error (err.message)
    } finally {
    }
})