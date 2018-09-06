const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

// io 全局的请求，socket 当前连接的请求
io.on("connection",function (socket) {
    console.log("user login")
    socket.on('sendmsg',function (data) {
        const { from ,to ,msg} = data;
        const chatId = [from,to].sort().join("_")
        Chat.create({chatId,from,to,content:msg},function (err,doc) {
            // doc 和doc._doc 结果值是一样的
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // console.log(data)
        // io.emit('recvmsg',data)
    })
})


const userRouter = require("./user")

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function () {
    console.log("node app start at port 9093")
})

