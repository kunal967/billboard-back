const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 8080
const DbService = require('./src/db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.get('/', (req,res)=>{
    const db = DbService.getDbServiceInstance()
    const result = db.getData()
    
    result
    .then(data => res.json({data:data}))
    .catch(err =>console.log(err))
})


app.post("/", (req,res)=>{
    const {Name} = req.body;
    const {Date} = req.body;
    const {Trip} = req.body;
    const {MarkerType} = req.body;
    const {Distance} = req.body;
    const {TotalFare} = req.body;
    console.log(Name, Date,Trip,MarkerType,Distance, TotalFare)
    
    const db = DbService.getDbServiceInstance()
    const result = db.postData(Name, Date,Trip,MarkerType,Distance, TotalFare)

    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err.message))
})
app.listen(PORT, ()=>{
    console.log("app listning on " + PORT);
})
