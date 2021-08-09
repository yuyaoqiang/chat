import React, { useState } from "react";
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button, Switch } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push, goBack } = useHistory();
 const { homeState, location } = props;
 const { state } = location;
 const [checked, setChecked] = useState(false)
 return (
  <div className="my-wrap">
   <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
   <div className="my-top">
    <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
    <p>
     <span>{state.nickName}</span>
     <span>圈子号: {state.code}</span>
    </p>
   </div>
   <List className="my-list">
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item>
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item>
    <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>} onClick={() => push('/chat')}>发消息</Button>
    <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-jiahao" style={{ fontSize: '22px', color: '#16ac15' }}></i>} onClick={() => push('')}>加好友</Button>
   </List>
  </div>
 )
}
export default inject('homeState')((observer(Home)));