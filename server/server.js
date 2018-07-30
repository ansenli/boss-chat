const express = require('express');

const  mongoose = require('mongoose');
// 连接mongo
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL)

mongoose.connection.on('connected',function () {
    console.log("mongo connect success")
})


const app = express();

app.get('/',function (req,res) {
    res.send("<h1>Hello world</h1>")
})
app.get('/data',function (req,res) {
    res.json({
        name:'asl',
        type:'It',
        sex:12
    })
})
app.listen(9093,function () {
    console.log("Node app start at port 9093")
    
})