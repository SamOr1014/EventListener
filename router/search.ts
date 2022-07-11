import express from 'express'
import {client} from '../server'

export const search = express.Router()

// search.get('/', (req, res)=> {
//     res.redirect('search.html')
// })

search.get('/keyword', async (req, res)=> {
    const keyword = req.query.keyword
    console.log(keyword)
    const matchedEvent = await client.query("select * from events")
    res.json(matchedEvent.rows)
})

search.get('/genres', (req, res)=> {
    const genre = req.query.genre
    console.log(genre)
    res.redirect(`/search.html?genre=${genre}`)
})

search.get('/search.html', (req,res)=> {
    console.log(req.query)
    res.json({success : true})
})