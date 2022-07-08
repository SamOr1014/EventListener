import express from 'express'
// import { client } from '../server'


export const admin = express.Router()

admin.get('/',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('/admin/users')
})

admin.get('/users',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('admin-alluser.html')
})
admin.get('/events',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('admin-allevent.html')
})
admin.get('/reports',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('admin-allreports.html')
})

admin.use(express.static('private'))