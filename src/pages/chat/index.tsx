import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { SearchBar, SwipeAction,Badge } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState } = props;
 return (
  <div className="main-chat-wrap">
   <header>
   <i className=" iconfont icon-fanhui" style={{ fontSize: 24, color: '#333' }} onClick={()=>push("/")}></i>
    <span>聊天页</span>
   </header>
   <ul className="chats-wrap">

   </ul>
  </div>
 )
}
export default inject('homeState')((observer(Home)));