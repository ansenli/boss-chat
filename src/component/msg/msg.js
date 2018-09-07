import React, { Component ,Fragment} from 'react'
import {connect} from 'react-redux'
import {List,Badge } from 'antd-mobile'

@connect(
    state => state,
)
class Msg extends Component {
    getLast(arr){
        return arr[arr.length -1]
    }
    render(){
        const {Item} = List;
        const {Brief} = Item;
        const userId = this.props.user._id;
        const userinfo = this.props.chat.users;
        const msgGroup ={}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || []
            msgGroup[v.chatId].push(v)
        });
        const chatList = Object.values(msgGroup)

        return (
            <Fragment>               
                    {
                        chatList.map(v=>{
                            const lastItem = this.getLast(v)
                            const targetId = v[0].from == userId ? v[0].to : v[0].from
                            const unreadNum = v.filter(v=>!v.read && v.to ==userId).length
                            console.log(lastItem,targetId)
                            return (
                                <List key ={lastItem._id}>
                                    <Item
                                        extra ={<Badge text={unreadNum}></Badge>}
                                        thumb ={require(`../img/${userinfo[targetId].avatar}.png`)}
                                    >

                                        {lastItem.content}
                                        <Brief>{userinfo[targetId].name}</Brief>
                                    </Item>
                                </List>
                            )
                        })
                        
                    }
                
            </Fragment>
        )
    }
}

export default Msg