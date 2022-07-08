import express from 'express'
import { client } from '../server'
// import { client } from '../server'


export const admin = express.Router()

admin.get('/',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('/admin/users')
})

admin.get('/users',(req, res)=> {
    console.log("Enter admin users panel")
    res.redirect('admin-alluser.html')
})
admin.get('/events',(req, res)=> {
    console.log("Enter admin events panel")
    res.redirect('admin-allevent.html')
})
admin.get('/reports',(req, res)=> {
    console.log("Enter admin reports panel")
    res.redirect('admin-allreports.html')
})
admin.get('/reports/details', async (req,res)=> {
    const reportsDetail = await client.query('select * from reports where solved = false')
    res.json(reportsDetail.rows)
})
admin.get('/reports/details',async (req, res)=> {
    console.log("Getting reports")
    const reports = await client.query('select * from reports')
    res.json(reports.rows)
})

admin.use(express.static('private'))