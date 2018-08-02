import axios from 'axios'
import {getRedirectPath} from '../util'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    type:'',
}

// reducer
export function user(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
    
}

// action
function authSuccess(obj) {
    const {pwd,...data}=obj;
    return {
        type:AUTH_SUCCESS,
        payload:data
    }
    
}
function errorMsg(msg){
    return {
        msg,
        type:ERROR_MSG
    }
}

// 异步执行逻辑
export function loadData(userinfo){
    return {
        type:LOAD_DATA,
        payload:userinfo
    }
}

export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status===200&&res.data.code ===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user,passwd}) {
    if(!user || !passwd){
        return errorMsg('请输入用户名密码')
    }
    return dispatch =>{
        axios.post('/user/login',{user,passwd})
           
            .then(res =>{
                if(res.status ===200&& res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user,passwd,repeatpwd,type}) {
    if(!user || !passwd || !type){
        return errorMsg('请输入用户名密码')
    }
    if(passwd !== repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch =>{
        axios.post('/user/register',{user,passwd,type})
            .then(res=>{
                if(res.status===200 && res.data.code === 0){
                    dispatch(authSuccess({user,passwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}