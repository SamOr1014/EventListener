import express from 'express'
// import {client} from '../server'

export const explore = express.Router()

// client

explore.use('/', (req, res) => {
    res.redirect('explore.html')
  })