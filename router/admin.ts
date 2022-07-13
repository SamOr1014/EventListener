import express from "express"
import { client } from "../server"

export const admin = express.Router()

admin.get("/", (req, res) => {
  console.log("Enter admin panel")
  res.redirect("/admin/users")
})

//get the users page only
admin.get("/users", (req, res) => {
  console.log("Enter admin users panel")
  res.redirect("admin-alluser.html")
})
//ban or unban user
admin.put("/users/ban-status", async (req, res) => {
  const userToBeBam = req.query.banid
  //check the ban status of the user
  const banStatus = (await client.query("select is_banned from users where id = $1", [userToBeBam]))
    .rows[0].is_banned
  if (!banStatus) {
    await client.query("update users set is_banned = true where id = $1", [userToBeBam])
  } else {
    await client.query('update users set is_banned = false where id = $1',[userToBeBam])
  }
  res.json({updateBan : true})
})

//get the page event only
admin.get("/events", (req, res) => {
  console.log("Enter admin events panel")
  res.redirect("admin-allevent.html")
})

//admin getting all event in the event panel
admin.get('/allEvents', async (req, res)=> {
  const allEvent = await client.query('select * from events order by id asc')
  res.json(allEvent.rows);
});

admin.get('/allEvents/activeEvents', async (req, res)=> {
  const allEvent = await client.query('select * from events where is_deleted = false and is_active = true order by id asc')
  res.json(allEvent.rows);
});

admin.get('/allEvents/inactiveEvents', async (req, res)=> {
  const allEvent = await client.query('select * from events where is_deleted = false and is_active = false order by id asc')
  res.json(allEvent.rows);
});

admin.get('/allEvents/deletedEvents', async (req, res)=> {
  const allEvent = await client.query('select * from events where is_deleted = true order by id asc')
  res.json(allEvent.rows);
});

//delete event by setting their is_deleted column to true
admin.put('/events/deletestatus', async (req, res)=> {
  const deleteEvent = req.query.eventid
  const isdeleteStatus = (await client.query('select is_deleted from events where id = $1;',[deleteEvent])).rows[0].is_deleted

  isdeleteStatus?await client.query('update events set is_deleted = false where id = $1',[deleteEvent]):await client.query('update events set is_deleted = true where id = $1',[deleteEvent])
  res.json({ deleteEvent: true })
})

//changing the event to inactive from the report panel
admin.put("/events/inactivestatus", async (req, res) => {
  if (!req.query.eventid) {
    res.json({ deactivate: false, message: "invalid request" })
    return
  }
  const eventidToBeInactive = req.query.eventid
  const isactiveStatus = (await client.query('select is_active from events where id = $1;',[eventidToBeInactive])).rows[0].is_active
  //check is_active status 
  isactiveStatus?await client.query("update events set is_active = false where id = $1", [eventidToBeInactive]):await client.query("update events set is_active = true where id = $1", [eventidToBeInactive])

  res.json({ deactivate: true })
})

//enter report page
admin.get("/reports", (req, res) => {
  console.log("Enter admin reports panel")
  res.redirect("admin-allreports.html")
})

//when admin solve a report
admin.put("/reports/solved", async (req, res) => {
  console.log("u solved")
  if (!req.query.reportid) {
    res.json({ deactivate: false, message: "invalid request" })
    return
  }
  const reportsid = req.query.reportid
  await client.query("update reports set solved = true where id = $1;", [reportsid])
  res.json({ solve: true })
})
//make all inactive event's report solved
admin.put("/reports/solvedeactiveevent", async (req, res) => {
  console.log("u solved")
  if (!req.query.eventid) {
    res.json({ deactivate: false, message: "invalid request" })
    return
  }
  const eventid = req.query.eventid
  await client.query("update reports set solved = true where event_id = $1;", [eventid])
  res.json({ solve: true })
})

admin.get("/reports/details", async (req, res) => {
  const reportsDetail = await client.query(
    "select reports.id, reports.user_id, reports.reason, reports.event_id from reports inner join events on reports.event_id = events.id where reports.solved = false and events.is_active = true order by reports.id asc;"
  )
  console.log(reportsDetail.rows)
  res.json(reportsDetail.rows)
})

admin.use(express.static("private"))
