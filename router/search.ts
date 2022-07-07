import express from 'express'
// import {client} from '../server'

export const search = express.Router()

search.get('/', (req, res)=> {
    res.redirect('search.html')
})

search.get('/keyword', (req, res)=> {
    const keyword = req.query.searchword
    console.log(keyword)
    res.send('keywords search')
})

search.get('/genre', (req, res)=> {
    const genre = req.query.genre
    console.log(genre)
    res.send('genre search')
})