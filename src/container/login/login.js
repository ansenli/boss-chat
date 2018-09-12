import React, { Component ,Fragment} from 'react';
import { 
    WhiteSpace,
    WingBlank,
    Button,
    List,
    InputItem
 } from 'antd-mobile';

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
 
import Logo from '../../component/logo/logo'
@connect( 
    state =>state.user,
    {login}
)
class Login extends Component {
    constructor(props) {
        super(props)
        this.state={
            user:'',
            passwd:'',
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    
    
    handlerChange (key,value){
        this.setState({
            [key]:value
        })
    }
    login(){
        this.props.login(this.state)
    }
    register(){
        this.props.history.push('/register')
    }
    render(){
        return (
            <Fragment>
                {
                    (this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} /> : null
                }
                <Logo></Logo>
                <List>
                    {
                        this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null
                    }
                    <InputItem placeholder="请输入用户名"  onChange ={(v)=>this.handlerChange("user",v)} >
                        用户名
                    </InputItem>
                    <InputItem placeholder="请输入用密码" type="password" onChange ={(v)=>this.handlerChange("passwd",v)}  >
                        密码
                    </InputItem>
                    <WhiteSpace />
                    <WingBlank>
                        <Button type="primary" onClick={this.login} >登录</Button>
                    </WingBlank>
                    <WhiteSpace />
                    <WingBlank>
                        <Button onClick ={this.register} type="primary" >注册</Button>
                    </WingBlank>
                    <WhiteSpace />  
                </List>
            </Fragment>
            
        )
    }
}
export default Login