import { client } from "../server";
import { Request, Response } from "express";

async function getAllEvent(req: Request, res: Response) {
  const getEvent = (await client.query(/*sql */ `SELECT * FROM events WHERE ID =1`)).rows;
  res.json(getEvent);
}
