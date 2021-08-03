import React, { useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button, Switch } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState } = props;
 const [checked, setChecked] = useState(false)
 return (
  <div className="my-wrap">
   <div className="my-top">
    <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
    <p>
     <span>我是前端!我是前端!</span>
     <span>圈子号: 12345576</span>
    </p>
   </div>
   <List className="my-list">
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item>
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item>
    <List.Item arrow="horizontal">投诉</List.Item>
    <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>}>发消息</Button>
    <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-jiahao" style={{ fontSize: '22px', color: '#16ac15' }}></i>}>加好友</Button>
   </List>
   <NavBar />
  </div>
 )
}
export default inject('homeState')((observer(Home)));