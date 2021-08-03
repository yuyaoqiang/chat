import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState } = props;
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
    <List.Item arrow="horizontal" onClick={() => push("/block")}>黑名单</List.Item>
    <List.Item arrow="horizontal" onClick={() => push("/changePwd")}>修改密码</List.Item>
    <Button style={{color:'red'}}>退出</Button>
   </List>
   <NavBar />
  </div>
 )
}
export default inject('homeState')((observer(Home)));