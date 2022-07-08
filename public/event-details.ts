import { client } from "../server";
import { Request, Response } from "express";

async function getAllEvent(req: Request, res: Response) {
  const getEvent = (
    await client.query(
      /*sql */ `SELECT id, name, venue, max_participant, content FROM events ORDER BY id`
    )
  ).rows;
  res.json(getEvent);
}
