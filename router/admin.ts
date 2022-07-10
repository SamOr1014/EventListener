import express from 'express'
import { client } from '../server'



export const admin = express.Router()

admin.get('/',(req, res)=> {
    console.log("Enter admin panel")
    res.redirect('/admin/users')
})

//get the users page only
admin.get('/users',(req, res)=> {
    console.log("Enter admin users panel")
    res.redirect('admin-alluser.html')
})

//get the page event only
admin.get('/events',(req, res)=> {
    console.log("Enter admin events panel")
    res.redirect('admin-allevent.html')
})



admin.get('/reports',(req, res)=> {
    console.log("Enter admin reports panel")
    res.redirect('admin-allreports.html')
})

admin.put('/reports/solved', async (req, res)=> {
    console.log('u solved')
    const reportsid = req.query.reportid
    await client.query('update reports set solved = true where id = $1',[reportsid])
    res.json({solve : true})
})


admin.get('/reports/details', async (req,res)=> {
    const reportsDetail = await client.query('select * from reports where solved = false')
    res.json(reportsDetail.rows)
})

admin.use(express.static('private'))