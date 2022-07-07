import express from 'express'
import {client} from '../server'

export const followers = express.Router()

followers.get('/', async (req, res)=> {
    const userID = req.query.userid
    const followersName = await client.query('select first_name, last_name from follower_relation inner join users on follower_relation.follower_id = users.id where follower_relation.user_id = $1;',[userID])
    console.log(followersName.rows)
    res.json(followersName.rows)
})