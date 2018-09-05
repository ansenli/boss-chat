const mongoose = require('mongoose')
// 连接 mongo 并且使用hsyk 这个集合

const DB_URL = 'mongodb://localhost:27017/boss-chat'
// mongoose.connect(DB_URL)
mongoose.connect(DB_URL, {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})
const models = {
    user:{
        'user':{type:String, 'require':true},
		'passwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}

    },
    chat:{
		'chatId':{'type':String,require:true},
		'from':{'type':String,require:true},
		'to':{'type':String,require:true},
		'read':{'type':Boolean,default:false},
		'content':{'type':String,require:true,defaule:''},
		'creat_time':{'type':Number,defaule:new Date().getTime()},
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}


module.exports = {

    getModel:function (name) {
        return mongoose.model(name)
    }
}