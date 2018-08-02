import React, { Component } from 'react';
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
import './avatar-selector.css'

class AvatarSelector extends Component{

    static propTypes ={
        selectAvatar:PropTypes.func.isRequired
    }
    state={

    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(item=>{
                            return {
                                icon:require(`../img/${item}.png`),
                                text:item
                            }
                        })
        const gridHeader = this.state.icon ? (
            <div className="header">
                已选择头像:&nbsp;
                <img src={this.state.icon} alt=''  style ={{width:20}} />
            </div>
        ):(<div className="header">请选择头像</div>)
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5} 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    > 
                    </Grid>
                </List>
            </div>
        )
    }

}

export default AvatarSelector