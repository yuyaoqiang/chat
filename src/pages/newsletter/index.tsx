import React, { useEffect, useState, useRef, useCallback } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import useDebounce from "@hooks/useDebounce"
import { relations, searchChatUser, invitation, invitationHandleWay } from "./request";
import { SearchBar, SwipeAction, Button, Toast } from "antd-mobile";
import { pySegSort } from "@entity/PinYin"
import {avatars, avatarsMap, gpAvatars, gpAvatarsMap} from "@utils/avatarData";

import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { newsletterState, chatState } = props;
 const { friendsSorted, initFriends, friends } = newsletterState
 const { clearMsg } = chatState
 const [invitations, setInvitations] = useState<any>([])
 const [searchList, setSearchList] = useState<any>([])
 const [isSearching, setIsSearching] = useState<string>('')

 // 好友申请列表
 const invitationRequest = () => {
  invitation({}).then((res: any) => {
   setInvitations(res)
  })
 }
 // 防抖搜索
 const searchRequest = useDebounce((e: any) => {
  if (e.length <= 0) return;
  searchChatUser({ code: e }).then((res: any) => {
   const { content } = res;
   const userSorted = sortByNickName(content)
   setSearchList(userSorted || [])
  })
 }, 1000)

 // 列表字母排序
 const sortByNickName = (users: any[]) => {
  return pySegSort(users)
 }
 // 通过
 const passInvitation = (user: any) => {
  let data = { invitationId: user.id, action: 'PASS' };
  invitationHandleWay(data).then(res => {
   invitationRequest()
   initFriends()
  })

 }
 // 拒绝
 const rejectInvitation = (user: any) => {
  let data = { invitationId: user.id, action: 'REJECT' }
  invitationHandleWay(data).then(res => {
   invitationRequest()
   initFriends()
  })
 }
 // 查询好友过滤是否存在好友
 const searchFilter = (user: any) => {
  let hasFriend = friends.filter((friend: any) => friend.partnerCode === user.code)
  if (hasFriend.length === 0) {
   push({ pathname: '/searchInfo', state: user })
  } else {
   push({ pathname: '/friendInfo', state: user })
  }
 }
 useEffect(() => {
  invitationRequest()
  initFriends()
 }, [])

 useEffect(() => {
  if (isSearching.length === 0) {
   setSearchList([])
  }
 }, [isSearching])
 const pushRouter = (user: any) => {
  clearMsg()
  if (user.userType === 'USER') {
   push({ pathname: '/friendInfo', state: user })
  } else {
   push({ pathname: '/groupInfo', state: user })
  }
 }
 return (
  <div className="newsletter-wrap">
   <header>
    <span>通讯录</span>
   </header>
   <SearchBar
    placeholder="Search"
    maxLength={8}
    onChange={(e) => {
     searchRequest(e)
     setIsSearching(e)
    }} />

   <ul className="new-people-wrap">
    {
     invitations.map((item: any) => {
      return (
       <li className="chat-item" key={item.id}>
        <p className="chat-item-left">
         <img src={item.fromUserHeadIcon} alt="" />
        </p>
        <div className="flex-center">
         <p className="chat-name-date">
          <span>{item.fromUserNickName}</span>
         </p>
         <p className="chat-btn">
          <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={() => passInvitation(item)}>通过</Button>
          <Button type="warning" inline size="small" style={{ marginRight: '4px' }} onClick={() => rejectInvitation(item)}>拒绝</Button>
         </p>
        </div>
       </li>
      )
     })
    }
   </ul>

   <ul className="chats-wrap">
    {
     isSearching.length <= 0 && friendsSorted.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((user: any) => (
          <li className="chat-item" key={item.initial} onClick={() => pushRouter(user)}>
           <p className="chat-item-left">
            <img src={user.headIcon} alt="" />
           </p>
           <div className="chat-item-right">
            <p className="chat-name-date">
             {user.userType === 'USER' && <span style={{color:'#56c156'}}>{user.nickName}</span>}
             {user.userType === 'GROUP' && <span style={{color:'#ff6fce'}}>{user.nickName}</span>}
            </p>
           </div>
          </li>
         ))
        }
       </div>
      )
     })
    }
    {
     isSearching.length > 0 && searchList.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((user: any) => (
          <li className="chat-item" key={item.initial} onClick={() => searchFilter(user)}>
           <p className="chat-item-left">
            <img src={item.headIcon} alt="" />
           </p>
           <div className="chat-item-right">
            <p className="chat-name-date">
             <span>{user.nickName}</span>
            </p>
           </div>
          </li>
         ))
        }
       </div>
      )
     })
    }
   </ul>
   <NavBar />
  </div >
 )
}
export default inject('newsletterState', 'chatState')((observer(Home)));