import express from "express";
import { form } from "../server";
import { Request, Response, NextFunction } from "express";
import type { Fields, Files } from "formidable";
import { client } from "../server";
export const event = express.Router();

let dateTime = new Date();

declare global {
  namespace Express {
    interface Request {
      form?: {
        fields: Fields;
        files: Files;
      };
    }
  }
}

export const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    req.form = { fields, files };
    next();
  });
};

event.get("/", (req, res) => {
  res.redirect("createEvent.html");
});

event.get('/allEvents', async (req, res)=> {
    const allEvent = await client.query('select * from events where is_deleted = false and is_active = true and is_full = false')
    res.json(allEvent.rows);
});

event.get('/createdEvent', async (req, res)=> {
  const userCreated = await client.query('select * from events where organiser_id = $1 order by date desc',[req.session['user'].ID])
  console.log(userCreated.rows)
  res.json(userCreated.rows)
})

event.get('/joinedEvent', async (req, res)=> {
  const userJoined = await client.query('select * from events inner join users_joined on events.id = users_joined.event_id where users_joined.user_id = $1;', [req.session['user'].ID])
  console.log(userJoined.rows)
  res.json(userJoined.rows)
})

event.get("/details/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);
  // res.redirect("event-details.html");
});

event.use(express.static("public"));
event.post("/", formidableMiddleware, async (req, res) => {
  try {
    const form = req.form!;
    const eventName = form.fields.eventName;
    const type = form.fields.type;
    const eventDate = form.fields.eventDate;
    const eventTime = form.fields.eventTime;
    const time = `${eventDate} ${eventTime}`;
    const numberOfPart = form.fields.participants;
    const venue = form.fields.venue;
    const Fee = form.fields.Fee;
    const content = form.fields.content;
    // const imageFileName = form.files.image?.["originalFilename"];
    const imageSavedName = form.files.image?.["newFilename"];
    const user = req.session["user"];

    const saveEventSQL = `INSERT INTO events (name, date, max_participant,type, bio, venue, fee,organiser_id,image,created_at,is_full,is_active,is_deleted) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`;
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
    ]);
    res.json({ success: true, message: "event created" });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Event created");
  }
});
