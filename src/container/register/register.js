import React, { Component ,Fragment} from 'react';
import {  
    WhiteSpace,
    WingBlank,
    Button,
    List,
    InputItem,
    Radio
 } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
    state => state.user,
    {register}
)

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            passwd:'',
            repeatpwd:'',
            type:'genius',
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handlerChange = this.handlerChange.bind(this)
    }
    
    
    handleRegister(){
        this.props.register(this.state)
    }
    handlerChange(key,value){
        this.setState({
            [key]:value,
        })
    }
    render(){
        const {type} = this.state;
        const RadioItem = Radio.RadioItem;
        const dataList = [
            { type: "genius", label: '牛人' },
            { type: "boss", label: 'BOSS' },
        ]
        return (
            <Fragment>
                {
                    this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null
                }
                <Logo></Logo>
                <WingBlank>
                <List>
                    {
                        this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null
                    }
                    <InputItem placeholder="请输入用户名" onChange={(v)=>this.handlerChange("user",v)} >
                        用户名
                    </InputItem>
                    <InputItem placeholder="请输入用密码" type="password"  onChange={(v)=>this.handlerChange("passwd",v)} >
                        密码
                    </InputItem>
                    <InputItem placeholder="请输入用密码" type="password" onChange={(v)=>this.handlerChange("repeatpwd",v)} >
                        确认密码
                    </InputItem>
                    {
                        dataList.map(item=>{
                            return (
                                <RadioItem key={item.type} checked={type === item.type} onChange={() => this.handlerChange("type",item.type)}>
                                    {item.label}
                                </RadioItem>
                            )
                        })
                    }
                    <WhiteSpace />
                    <WingBlank>
                        <Button onClick ={this.handleRegister} type="primary" >提交</Button>
                    </WingBlank>
                    <WhiteSpace />  
                </List>
                </WingBlank>
            </Fragment>
            
        )
    }
}

export default Register