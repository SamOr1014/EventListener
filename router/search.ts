import express from "express"


const search = express.Router()

search.get("/", async (req, res) => {
    res.redirect("./public/search.html")
})

// app.get('/',function(req, res){
//     const category = req.query.category;
//     res.end();
// })