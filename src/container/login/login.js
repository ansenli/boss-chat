import React, { Component ,Fragment} from 'react';
import { Flex, 
    WhiteSpace,
    WingBlank,
    Button,
    List,
    InputItem
 } from 'antd-mobile';
import Logo from '../../component/logo/logo'
class Login extends Component {
    state={
        user:'',
        passwd:'',

    }
    handlerChange =(key,value)=>{
        this.setState({
            [key]:value
        })
    }
    login = ()=>{
        console.log("this.state...",this.state)
    }
    register=()=>{
        this.props.history.push('/register')
    }
    render(){
        return (
            <Fragment>
                <Logo></Logo>
                <List>
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