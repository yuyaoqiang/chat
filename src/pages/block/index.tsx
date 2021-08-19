import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { SearchBar, SwipeAction, Badge } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 return (
  <div className="block-wrap">
   <header>
    <i className=" iconfont icon-fanhui" style={{ fontSize: 24, color: '#333' }} onClick={() => push("/my")}></i>
    <span>黑名单</span>
   </header>
   <ul className="chats-wrap">
    {
     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(item => {
      return (
       <SwipeAction
        style={{ backgroundColor: 'gray' }}
        key={item}
        autoClose
        right={[
         {
          text: '解除黑名单',
          onPress: () => console.log('delete'),
          style: { backgroundColor: '#16ac15', fontSize: ' 14px', color: 'white' },
         },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
       >
        <li className="chat-item">
         <p className="chat-item-left">
          <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
         </p>
         <div className="chat-item-right">
          <p className="chat-name-date">
           <span>我是前端群我是前端群我是前端群我是前端群我是前端群我是前端群</span>
          </p>
         </div>
        </li>
       </SwipeAction>
      )
     })
    }
   </ul>
  </div>
 )
}
export default inject('homeState')((observer(Home)));