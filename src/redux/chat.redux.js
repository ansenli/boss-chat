import axios from 'axios'
import  io from 'socket.io-client'
// 因为本地是3000，后端是9093要跨越跨越所以要用url，
const socket = io('ws://localhost:9093')

// 获取聊天列表
const  MSG_LIST = "MSG_LIST";

// 读取信息
const MSG_RECV = "MST_RECV";

// 标识已读

const MSG_READ = "MSG_READ";

// 初始化state

const initState = {
    chatmsg:[],
    users:{},
    unread:0,
}

// reducer

export  function chat(state = initState,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read && v.to == action.payload.userId).length};
        case MSG_RECV:
            const number = action.payload.to == action.userId ? 1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+number}
        case MSG_READ:
            const {from,num} = action.payload
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),unread:state.unread-num}
        default:
            return  state;
    }
    
}

function msgList(msgs,users,userId) {
    return {
        type:MSG_LIST,
        payload:{msgs,users,userId}
    }
}
function msgRecv(msgs,userId) {
    return {
        userId,
        type:MSG_RECV,
        payload:msgs
    }
    
}
function msgRead({from,userId,num}) {
    return {
        type:"MSG_READ",
        payload:{from,userId,num}
    }
    
}
export function readMsg(from) {
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res =>{
                const userId =getState().user._id;
                if(res.status ==200 && res.data.code ==0){
                    dispatch(msgRead({userId,from,num:res.data.num}))
                }
            })
    }
}
export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',function (data) {
            const userId = getState().user._id;
            dispatch(msgRecv(data,userId))
        })
    }
    
}

export function sendMsg({from,to,msg}) {
    return dispatch =>{
        return socket.emit('sendmsg',{from,to,msg})
    }
}

export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
               
                if(res.status == 200 && res.data.code ==0){ 
                    const userId = getState().user._id;
                    dispatch(msgList(res.data.msgs,res.data.users,userId))
                }
            })
    }
    
}