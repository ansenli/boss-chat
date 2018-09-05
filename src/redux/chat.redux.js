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
    unread:0,
}

// reducer

export  function chat(state = initState,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length};
        case MSG_RECV:
            return {...state,chatmsg:[...state.chatmsg,action.payload]}
        default:
            return  state;
    }
    
}

function msgList(mgs) {
    return {
        type:MSG_LIST,
        payload:mgs
    }
}
function msgRecv(msgs) {
    return {
        type:MSG_RECV,
        payload:msgs
    }
    
}
export function recvMsg() {
    return dispatch=>{
        socket.on('recvmsg',function (data) {
            console.log('recvmsg....',data)
            dispatch(msgRecv(data))
        })
    }
    
}

export function sendMsg({from,to,msg}) {
    return dispatch =>{
        return socket.emit('sendmsg',{from,to,msg})
    }
}

export function getMsgList() {
    return dispatch=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.state==200 && res.data.code ==0){
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
    
}