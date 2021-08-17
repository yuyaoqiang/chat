import React, { useEffect } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { mm_dd_hh_mm_ss3 } from "@utils/dataTime"
import { SearchBar, SwipeAction, Badge } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState, chatState, userState } = props;
 const { unreadList, clearUnreadBySomeUser, delMsgByCode, setCurrentUser } = homeState
 const { user } = userState
 const { setChatUser, clearMsg } = chatState
 const toChatPage = (item: any) => {
  clearMsg();
  if (item.oriToChatUserType === 'GROUP') {
   setChatUser(item)
   setCurrentUser(item.oriToChatUserCode)
   push({ pathname: '/chat', state: { ...item, partnerCode: item.oriToChatUserCode } })
   return;
  } else {
   setChatUser(item)
   setCurrentUser(item.senderCode)
   push({ pathname: '/chat', state: { ...item, partnerCode: item.senderCode } })
  }
 }
 useEffect(() => {
  setCurrentUser('')
 }, [])
 return (
  <div className="home">
   <header>
    <span>消息</span>
    <i className="add-icon iconfont icon-jiahao" style={{ fontSize: 24, color: '#333' }} onClick={() => push('/createGroup')}></i>
   </header>
   <ul className="chats-wrap">
    {
     unreadList.map((item: any) => {
      const flag = item.msg.includes('INVITATION-');
      return (
       <SwipeAction
        style={{ backgroundColor: 'gray' }}
        key={item.senderCode}
        autoClose
        right={[
         {
          text: '删除',
          onPress: () => delMsgByCode(item),
          style: { backgroundColor: '#F4333C', fontSize: '16px', color: 'white' },
         },
        ]}
       >
        <li className="chat-item" onClick={() => {
         clearUnreadBySomeUser(item)
         toChatPage(item)
        }}>
         <p className="chat-item-left">
          <img src={item.senderHeadIcon} alt="" />
          {item.unreadCount > 0 && <Badge text={77} overflowCount={item.unreadCount} className="badge-my" />}
         </p>
         <div className="chat-item-right">
          <p className="chat-name-date">
           <span>{item.oriToChatUserType === 'GROUP' ? item.oriToChatUserNickName : item.senderNickName}</span>
           <span>{mm_dd_hh_mm_ss3(item.sendTime)}</span>
          </p>
          {
           item.msg.includes('INVITATION-') ? <p style={{ color: 'red' }} className="chat-fonts">[邀请]有人邀请您加入群聊</p> : null
          }
          {!flag && item.msg.includes(`@${user.nickName}`) && <p style={{ color: 'red' }} className="chat-fonts">{item.msg}</p>}
          {!flag && !item.msg.includes(`@${user.nickName}`) && <p className="chat-fonts">{item.msg}</p>}
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
export default inject('homeState', 'chatState', 'userState')((observer(Home)));