import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'


function Msg() {
    return <h2>消息列表页面</h2>
}

// function User(){
//     return <h2>个人中心页面</h2>
// }

@connect(
    state=>state
)

class Dashboard extends Component{
    

    render(){
        const {pathname} = this.props.location
        const user = this.props.user
        const navList =[
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type == 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type == 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },{
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        // 这里有个bug，看后面是否要修复
        return (
            <Fragment> 
                <NavBar className='fixd-header' mode='dard'>
                    { 
                        navList.find(item=>item.path==pathname).title 
                    }
                </NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {
                            navList.map(item=>(
                                <Route key={item.path} path={item.path} component={item.component}   ></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList} ></NavLinkBar>
            </Fragment>
        )
    }
}
export default Dashboard