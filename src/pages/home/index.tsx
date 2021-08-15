import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { mm_dd_hh_mm_ss3 } from "@utils/dataTime"
import { SearchBar, SwipeAction, Badge } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState } = props;
 const { unreadList } = homeState
 return (
  <div className="home">
   <header>
    <span>消息</span>
    <i className="add-icon iconfont icon-jiahao" style={{ fontSize: 24, color: '#333' }} onClick={() => push('/createGroup')}></i>
   </header>
   <ul className="chats-wrap">
    {
     unreadList.map((item: any) => {
      return (
       <SwipeAction
        style={{ backgroundColor: 'gray' }}
        key={item.senderCode}
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
        <li className="chat-item" onClick={() => push({ pathname: '/chat', state: { ...item, partnerCode: item.senderCode } })}>
         <p className="chat-item-left">
          <img src={item.senderHeadIcon} alt="" />
          <Badge text={77} overflowCount={item.unreadCount} className="badge-my" />
         </p>
         <div className="chat-item-right">
          <p className="chat-name-date">
           <span>{item.senderNickName}</span>
           <span>{mm_dd_hh_mm_ss3(item.sendTime)}</span>
          </p>
          <p className="chat-fonts">{item.msg}</p>
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