import express from "express"
import { form } from "../server"
import { Request, Response, NextFunction } from "express"
import type { Fields, Files } from "formidable"
import { client } from "../server"
export const event = express.Router()

export let dateTime = new Date()

declare global {
  namespace Express {
    interface Request {
      form?: {
        fields: Fields
        files: Files
      }
    }
  }
}

export const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      return
    }
    req.form = { fields, files }
    next()
  })
}

event.get("/", (req, res) => {
  // res.redirect("createEvent.html");
})

//Approving users to join event
event.put("/approve", async (req, res) => {
  console.log(req.body)
  const eventid = req.body.eventid
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
      eventid,
    ])
    res.json({ message: `Approve User ID ${reqUserid} joined Event ID ${eventid}` })
  } else if (approve === "no") {
    await client.query("update users_request set processed = true where id = $1", [reqid])
    res.json({ message: `Dismiss User ID ${reqUserid}'s Request` })
  }
})

// user applied and being approved
event.get("/approve", async (req, res) => {
  const userid = req.session["user"].ID
  const eventid = req.query.eventid
  const userJoinedSQL = /*sql */ `SELECT * FROM users_joined where user_id =$1 and event_id=$2;`
  const userJoined = await client.query(userJoinedSQL, [userid, eventid])
  if (userJoined.rowCount > 0) {
    res.json({ approve: true })
  } else {
    res.json({ approve: false })
  }
})

//selecting all active and not banned events
event.get("/allEvents", async (req, res) => {
  const allEvent = await client.query(
    "select * from events where is_deleted = false and is_active = true and is_full = false and date > $1",
    [dateTime]
  )
  res.json(allEvent.rows)
})

//select created event by the current session user
event.get("/createdEvent", async (req, res) => {
  const userCreated = await client.query(
    "select * from events where organiser_id = $1 order by date desc",
    [req.session["user"].ID]
  )
  res.json(userCreated.rows)
})

//select joined event by the current user
event.get("/joinedEvent", async (req, res) => {
  const userJoined = await client.query(
    "select * from events inner join users_joined on events.id = users_joined.event_id where users_joined.user_id = $1 order by events.date desc;",
    [req.session["user"].ID]
  )
  res.json(userJoined.rows)
})
//select upcoming joined event of a user
event.get("/joinedEvent/upcoming", async (req, res) => {
  const userJoined = await client.query(
    "select * from events inner join users_joined on events.id = users_joined.event_id where users_joined.user_id = $1 and events.date > NOW() order by events.id asc;",
    [req.session["user"].ID]
  )
  res.json(userJoined.rows)
})

event.get("/singleEvent", async (req, res) => {
  const eventid = req.query.eventid
  console.log(eventid)
  const getEventDetails = await client.query(/*sql */ `SELECT * FROM EVENTS WHERE ID =$1;`, [
    eventid,
  ])
  res.json(getEventDetails.rows[0])
})

event.get("/organiser", async (req, res) => {
  const eventid = req.query.eventid
  const getOrganiserId = await client.query(
    /*sql */ `SELECT t1.id, t1.last_name, t1.first_name, t1.phone, t1.email, t1.bio from users as t1 INNER JOIN events as t2 on t2.organiser_id = t1.id WHERE (t2.id = $1)`,
    [eventid]
  )
  res.json(getOrganiserId.rows[0])
  // console.log(getOrganiserId.rows[0])
})

event.use(express.static("public"))
event.use(express.static("src"))
event.use(express.static("uploads"))
event.post("/", formidableMiddleware, async (req, res) => {
  try {
    const form = req.form!
    const eventName = form.fields.eventName
    const type = form.fields.type
    const eventDate = form.fields.eventDate
    const eventTime = form.fields.eventTime
    const time = `${eventDate} ${eventTime}`
    const numberOfPart = form.fields.participants
    const venue = form.fields.venue
    const Fee = form.fields.Fee
    const content = form.fields.content
    // const imageFileName = form.files.image?.["originalFilename"];
    const imageSavedName = form.files.image?.["newFilename"]
    const user = req.session["user"]

    const saveEventSQL = `INSERT INTO events (name, date, max_participant,type, bio, venue, fee,organiser_id,image,created_at,is_full,is_active,is_deleted) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`
    await client.query(saveEventSQL, [
      eventName,
      time,
      numberOfPart,
      type,
      content,
      venue,
      Fee,
      user.ID,
      imageSavedName,
      dateTime,
      false,
      true,
      false,
    ])
    res.json({ success: true, message: "event created" })
  } catch (err) {
    console.error(err.message)
  } finally {
    console.log("Event created")
  }
})

event.get("/FollowerEvent", async (req, res) => {
  console.log(`UserID:${req.session["user"].ID}`)
  const FollowersSQL = `SELECT t1.id, t1.name, t1.date, t1.type, t1.fee, t1.venue, t1.image from events as t1 INNER JOIN follower_relation as t2 on t2.user_id =  t1.organiser_id 
  WHERE (t2.follower_id = $1 AND t1.is_active = true AND t1.is_full = false AND t1.is_deleted = false AND t1.date > $2);`
  const Followers = await client.query(FollowersSQL, [req.session["user"].ID, dateTime])
  console.log(Followers.rows)
  res.json(Followers.rows)
  // SELECT * FROM events inner join follower_relation on events.is_deleted = false and events.is_active = true and events.is_full = false && on events.organiser_id = follower_relation.user_id WHERE follower_relation.follower_id = 1
  // SELECT * FROM events join follower_relation on events.is_active = true JOIN events follower_relation on events.organiser_id = follower_relation.user_id WHERE follower_relation.follower_id = 1
  // SELECT * from events as t1 INNER JOIN follower_relation as t2 on t2.user_id =  t1.organiser_id WHERE (t2.follower_id = 1 AND t1.is_active = true AND t1.is_full = false AND t1.is_deleted = false);
  // SELECT * FROM events inner join follower_relation on events.organiser_id = follower_relation.user_id WHERE follower_relation.follower_id = $1
})

event.post("/applyButton", async (req, res) => {
  const userid = req.session["user"].ID
  const eventid = req.body.eventid
  const organiserid = req.body.organiserid
  console.log(organiserid)
  const applyButtonSQL = /*sql */ `INSERT INTO users_request (user_id, event_id, processed, organiser_id, created_at, updated_at) VALUES($1, $2, $3, $4, now(), now())`
  await client.query(applyButtonSQL, [userid, eventid, false, organiserid])
  res.json({ success: true })
})
// check user applied or not
event.get("/checkApply", async (req, res) => {
  const userid = req.session["user"].ID
  const eventid = req.query.eventid
  const SQLcheckApply = /*sql */ `SELECT * FROM users_request where users_request.user_id =$1 and users_request.event_id=$2`
  const checkApply = await client.query(SQLcheckApply, [userid, eventid])
  if (checkApply.rowCount > 0) {
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

// check applied user, being confirmed by organizer or not
event.get("/checkAppliedStatus", async (req, res) => {
  const userid = req.session["user"].ID
  const eventid = req.query.eventid
  const SQLcheckAppliedStatus = /*sql */ `SELECT users_request.processed FROM users_request WHERE users_request.user_id =$1 and users_request.event_id=$2`
  const checkAppliedStatus = await client.query(SQLcheckAppliedStatus, [userid, eventid])
  res.json(checkAppliedStatus.rows[0].processed)
})

event.post("/applyButton", async (req, res) => {
  const userid = req.session["user"].ID
  const eventid = req.body.eventid
  const organiserid = req.body.organiserid
  // console.log(organiserid)
  const applyButtonSQL = /*sql */ `INSERT INTO users_request (user_id, event_id, processed, organiser_id, created_at, updated_at) VALUES($1, $2, $3, $4, now(), now())`
  await client.query(applyButtonSQL, [userid, eventid, false, organiserid])
  res.json({ success: true })
})

event.post("/reports", async (req, res) => {
  try {
    const userid = req.session["user"]?.ID
    if (!userid) {
      res.json({ success: false })
      return
    }
    const eventid = req.body.eventid
    const reportReason = req.body.reportReason
    const reportsSQL = /*sql */ `INSERT INTO reports (user_id, event_id, reason, solved) VALUES ($1, $2, $3, false)`
    await client.query(reportsSQL, [userid, eventid, reportReason])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
  } finally {
  }
})
