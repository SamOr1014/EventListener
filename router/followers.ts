import express from "express"
import { client } from "../server"

export const followers = express.Router()

followers.get("/", async (req, res) => {
  const userID = req.session["user"].ID
  const followersName = await client.query(
    "select first_name, last_name from follower_relation inner join users on follower_relation.follower_id = users.id where follower_relation.user_id = $1;",
    [userID]
  )
  res.json(followersName.rows)
})

followers.post("/", async (req, res) => {
  const userID = req.session["user"].ID
  const followerID: any = req.query.organiserid
  if (parseInt(userID) === parseInt(followerID)) {
    res.json({ message: "U can't follow yourself" })
    return
  }
  const checkFollow = await client.query(
    `select * from follower_relation where user_id = $1 and follower_id=$2`,
    [userID, followerID]
  )
  if (checkFollow.rows[0]) {
    await client.query("delete from follower_relation where user_id = $1 and follower_id = $2", [
      userID,
      followerID,
    ])
    res.json({ message: "Unfollowed" })
    return
  } else {
    await client.query("insert into follower_relation (user_id, follower_id) values ($1, $2)", [
      userID,
      followerID,
    ])
    res.json({ message: "Followed" })
    return
  }
})

followers.get("/check", async (req, res) => {
  const userID = req.session["user"].ID
  const followerID = req.query.followerID
  const result = await client.query(
    `select * from follower_relation where user_id = $1 and follower_id=$2`,
    [userID, followerID]
  )
  if (result.rows[0]) {
    res.json({ success: true })
    return
  } else {
    res.json({ success: false })
    return
  }
})
