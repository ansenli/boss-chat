import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
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
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_SUCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
    
}

// action
function errorMsg(msg){
    return {
        msg,
        type:ERROR_MSG
    }
}
function loginSuccess(data) {
    return {
        type:LOGIN_SUCESS,
        payload:data
    }   
}

function registerSuccess(data) {
    return {
        type:REGISTER_SUCCESS,
        payload:data
    }
}

// 异步执行逻辑
export function loadData(userinfo){
    console.log("userinfo....",userinfo)
    return {
        type:LOAD_DATA,
        payload:userinfo
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
                    dispatch(loginSuccess(res.data.data))
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
    console.log("1111")
    return dispatch =>{
        axios.post('/user/register',{user,passwd,type})
            .then(res=>{
                if(res.status===200 && res.data.code === 0){
                    dispatch(registerSuccess({user,passwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}