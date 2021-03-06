import React, { Component ,Fragment} from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends Component{
    static propTypes ={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const { pathname } = this.props.location
        return (
            <Fragment>
                <TabBar>
                    {
                        navList.map(item=>(
                            <TabBar.Item
                                badge = { item.path === '/msg'? this.props.unread :0}
                                key={item.path}
                                title={item.text}
                                icon={{uri:require(`./img/${item.icon}.png`)}}
                                selectedIcon={{uri:require(`./img/${item.icon}-active.png`)}}
                                selected ={pathname === item.path}
                                onPress = {()=>{
                                    this.props.history.push(item.path)
                                }}
                            >
                            </TabBar.Item>
                        ))
                    }
                </TabBar>
                
            </Fragment>
        )
    }
}

export default NavLinkBar
