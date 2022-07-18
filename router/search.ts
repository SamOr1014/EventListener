import express from "express"
import { client } from "../server"

export const search = express.Router()

// search.get('/', (req, res)=> {
//     res.redirect('search.html')
// })

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
  const genre = req.query.genre
  console.log(genre)
  const matchedGenre = await client.query(
    `
SELECT * 
FROM events 
WHERE events.type = $1 and is_active = true and is_deleted = false and is_full = false order by date asc;
        `,
    [genre]
  )
  res.json(matchedGenre.rows)
})
