import React, { Component,Fragment } from 'react';
import {List,InputItem} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList ,sendMsg ,recvMsg }  from '../../redux/chat.redux'
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
    componentDidMount(){
        // socket.on('recvmsg', (data)=> {
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
        this.props.getMsgList()
        this.props.recvMsg()
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
        return (
            <Fragment>
                {
                    this.state.msg.map(v=>{
                        return (
                            <p key={v}>{v}</p>
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
            </Fragment>
        )
    }
}

export default Chat