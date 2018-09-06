import React, { Component ,Fragment} from 'react'
import {connect} from 'react-redux'

@connect(
    state => state,
)
class Msg extends Component {

    render(){
        const msgGroup ={}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || []
            msgGroup[v.chatId].push(v)
        });
        return (
            <Fragment>
                <div>
                    消息列表
                </div>
            </Fragment>
        )
    }
}

export default Msg