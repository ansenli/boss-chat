import React, { Component,Fragment } from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList ,sendMsg ,recvMsg }  from '../../redux/chat.redux'
import {getChatId} from '../../util'
import  io from 'socket.io-client'
// 因为本地是3000，后端是9093要跨越跨越所以要用url，
const socket = io('ws://localhost:9093')
@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg}
)
class Chat extends Component{
    constructor(props) {
        super(props)
        this.state = {text:'',msg:[]}
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        
    }
    handleSubmit=()=>{
        // socket.emit('sendmsg',{text:this.state.text})
        
        const msg = this.state.text;
        const from = this.props.user._id;
        const to = this.props.match.params.user;

        this.props.sendMsg({from,to,msg})
        this.setState({
            text:''
        })
    }
    render(){
        const Item = List.Item;
        const { chat : { chatmsg = [] } } = this.props
        const userId = this.props.match.params.user
        const {users} = this.props.chat
        const chatId = getChatId(userId,this.props.user._id)
        const chatmsgs = chatmsg.filter(v=>v.chatId == chatId)

        if(!users[userId]){
            return null
        }
        return (
            <Fragment>
                <div id="chat-page">
                    <NavBar
                   icon={<Icon type="left" />}
                    onLeftClick ={()=>{
                        this.props.history.goBack()
                       
                    }}
                    >{users[userId].name}</NavBar>
                    {

                        chatmsgs.map(v =>{
                            const avatar = require(`../img/${users[v.from].avatar}.png`)
                            return v.from == userId ? (
                                <List key ={ v._id }>
                                    <Item 
                                    thumb ={avatar}
                                    >{v.content} </Item>
                                </List>
                            ):(
                                <List key ={ v._id }>
                                    <Item
                                        extra = {<img src={avatar} />}
                                        className ="chat-me"
                                    >{v.content} </Item>
                                </List>
                            )
                        })
                    }
                    <div className="stick-footer">
                        <List >
                            <InputItem
                                placeholder="请输入"
                                value={this.state.text}
                                onChange={(v)=>{
                                    this.setState({
                                        text:v
                                    })
                                }}
                                extra={
                                    <span onClick={this.handleSubmit} >发送</span>
                                }  
                            >
                            信息
                            </InputItem>
                        </List>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Chat