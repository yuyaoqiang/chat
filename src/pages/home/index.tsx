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
  <div className="home">
   <header>
    <span>消息</span>
    <i className="add-icon iconfont icon-jiahao" style={{ fontSize: 24, color: '#333' }} onClick={()=>push('/createGroup')}></i>
   </header>
   <ul className="chats-wrap">
    {
     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16].map(item => {
      return (
       <SwipeAction
        style={{ backgroundColor: 'gray' }}
        key={item}
        autoClose
        right={[
         {
          text: '删除',
          onPress: () => console.log('delete'),
          style: { backgroundColor: '#F4333C', fontSize: '16px', color: 'white' },
         },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
       >
        <li className="chat-item" onClick={()=>push('/chat')}>
         <p className="chat-item-left">
          <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
          <Badge text={77} overflowCount={55} className="badge-my"/>
         </p>
         <div className="chat-item-right">
          <p className="chat-name-date">
           <span>我是前端群</span>
           <span>7-18 2:00</span>
          </p>
          <p className="chat-fonts">我是前端聊天群我是前端聊天群我是前端聊天群我是前端聊</p>
         </div>
        </li>
       </SwipeAction>
      )
     })
    }
   </ul>
   <NavBar />
  </div>
 )
}
export default inject('homeState')((observer(Home)));