import express from "express"
import type { Request, Response } from "express"
import { client } from "../../server"

export const eventApproval = express.Router()

//Approving users to join event
eventApproval.put("/", updateApproval)
// user applied and being approved
eventApproval.get("/", getApproval)

async function getApproval(req: Request, res: Response) {
  const userid = req.session["user"].ID
  const eventid = req.params.eid
  const userJoinedSQL = /*sql */ `SELECT * FROM users_joined where user_id =$1 and event_id=$2;`
  const userJoined = await client.query(userJoinedSQL, [userid, eventid])
  if (userJoined.rowCount > 0) {
    res.json({ approve: true })
  } else {
    res.json({ approve: false })
  }
}

async function updateApproval(req: Request, res: Response) {
  console.log(req.body)
  const eventId = req.params.eid
  const reqUserid = req.body.reqUserid
  const reqid = req.body.reqid
  const approve = req.query.approve

  if (!approve) {
    res.json({ success: false, message: "Invalid query" })
  }

  if (approve === "yes") {
    await client.query("update users_request set processed = true where id = $1", [reqid])
    await client.query("insert into users_joined (user_id, event_id) values ($1, $2)", [
      reqUserid,
      eventId,
    ])
    res.json({ message: `Approve User ID ${reqUserid} joined Event ID ${eventId}` })
  } else if (approve === "no") {
    await client.query("update users_request set processed = true where id = $1", [reqid])
    res.json({ message: `Dismiss User ID ${reqUserid}'s Request` })
  }
}
