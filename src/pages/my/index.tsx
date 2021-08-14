import React, { useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { userState } = props;
 const { userInfo, logout } = userState;
 const logoutHandle = () => {
  logout()
 }
 return (
  <div className="my-wrap">
   <div className="my-top">
    <img src={userInfo.headIcon} alt="" />
    <p>
     <span>{userInfo.nickName}</span>
     <span>圈子号: {userInfo.code}</span>
    </p>
   </div>
   <List className="my-list">
    <List.Item arrow="horizontal" onClick={() => push("/block")}>黑名单</List.Item>
    <List.Item arrow="horizontal" onClick={() => push("/changePwd")}>修改密码</List.Item>
    <Button style={{ color: 'red' }} onClick={logoutHandle}>退出</Button>
   </List>
   <NavBar />
  </div>
 )
}
export default inject('userState')((observer(Home)));