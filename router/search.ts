import express from "express"
import { client } from "../server"

export const search = express.Router()

search.get("/keyword", async (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const matchedEvent = await client.query(
    "select * from events where name ILIKE $1 and is_active = true and is_deleted = false and is_full = false order by date asc",
    [`%${keyword}%`]
  )

  console.log(matchedEvent.rows)
  res.json(matchedEvent.rows)
})

search.get("/genres", async (req, res) => {
  const genreArr = queryStrToArr(req, "genre")
  // WHERE (events.type = $1 OR events.type = $2)
  let sqlQuery = /*sql */ `SELECT * FROM events WHERE (`
  if (!genreArr) {
    res.json({})
    return
  }
  for (let i = 0; i < genreArr.length; i++) {
    if (i !== 0) {
      sqlQuery += " OR "
    }
    sqlQuery += `events.type = $${i + 1}`
  }
  sqlQuery += /*sql */ `)
    and is_active = true
    and is_deleted = false
    and is_full = false order by date asc;
    `

  console.log(genreArr)
  console.log(sqlQuery)
  const matchedGenre = await client.query(sqlQuery, genreArr)
  res.json(matchedGenre.rows)
})

function queryStrToArr(req: express.Request, key: string): Array<string> | undefined {
  const value = req.query[key]
  if (typeof value === "string") {
    return [value]
  }
  return value as Array<string> | undefined
}
