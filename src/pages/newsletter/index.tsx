import React, { useEffect, useState, useRef, useCallback } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import useDebounce from "@hooks/useDebounce"
import { relations, searchChatUser, invitation } from "./request";
import { SearchBar, SwipeAction, Button } from "antd-mobile";
import { pySegSort } from "@entity/PinYin"
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { newsletterState } = props;
 const { cacheFriends } = newsletterState
 const [invitations, setInvitations] = useState<any>([])
 const [searchList, setSearchList] = useState<any>([])
 const [friends, setFriends] = useState<any>([])
 const [isSearching, setIsSearching] = useState<string>('')

 const names = [
  {
   code: 1,
   nickName: 'z'
  },
  {
   code: 2,
   nickName: 'a'
  },
  {
   code: 3,
   nickName: '余'
  },
  {
   code: 4,
   nickName: '张'
  },
  {
   code: 5,
   nickName: '哈'
  },
  {
   code: 6,
   nickName: 'h'
  },
  {
   code: 7,
   nickName: '9'
  },
  {
   code: 8,
   nickName: '@#4'
  },
  {
   code: 9,
   nickName: 'c'
  },
  {
   code: 10,
   nickName: 'F'
  },
  {
   code: 11,
   nickName: 'G'
  },
  {
   code: 12,
   nickName: '流'
  },
  {
   code: 13,
   nickName: '李'
  },
  {
   code: 14,
   nickName: '欣'
  },
 ]
 const names2 = [
  {
   id: 1,
   nickName: 'z'
  },
  {
   id: 2,
   nickName: 'a'
  }
 ]
 const invitationsMock = [
  {
   header: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
   nickname: '我是Y',
   code: '123'
  },
  {
   header: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
   nickname: '我是X',
   code: '32'
  }
 ]
 // 好友群列表
 const invitationRequest = () => {
  invitation({}).then((res: any) => {
   const { content } = res;
   setInvitations(invitationsMock)
  })
 }
 // 好友群列表
 const relationsRequest = () => {
  relations({}).then((res: any) => {
   const { content } = res;
   const userSorted = sortByNickName(names)
   cacheFriends(names)
   setFriends(userSorted)
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

 useEffect(() => {
  invitationRequest()
  relationsRequest()
 }, [])
 useEffect(() => {
  if (isSearching.length === 0) {
   setSearchList([])
  }
 }, [isSearching])
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
       <li className="chat-item" key={item.code}>
        <p className="chat-item-left">
         <img src={item.header} alt="" />
        </p>
        <div className="flex-center">
         <p className="chat-name-date">
          <span>{item.nickname}</span>
         </p>
         <p className="chat-btn">
          <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>通过</Button>
          <Button type="warning" inline size="small" style={{ marginRight: '4px' }}>拒绝</Button>
         </p>
        </div>
       </li>
      )
     })
    }
   </ul>

   <ul className="chats-wrap">
    {
     isSearching.length <= 0 && friends.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((user: any) => (
          <SwipeAction
           style={{ backgroundColor: 'gray' }}
           key={item.initial}
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
           <li className="chat-item" onClick={() => push({ pathname: '/friendInfo', state: user })}>
            <p className="chat-item-left">
             <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
            </p>
            <div className="chat-item-right">
             <p className="chat-name-date">
              <span>{user.nickName}</span>
             </p>
            </div>
           </li>
          </SwipeAction>
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
          <SwipeAction
           style={{ backgroundColor: 'gray' }}
           key={item.initial}
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
           <li className="chat-item" onClick={() => push({ pathname: '/friendInfo', state: user })}>
            <p className="chat-item-left">
             <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
            </p>
            <div className="chat-item-right">
             <p className="chat-name-date">
              <span>{user.nickName}</span>
             </p>
            </div>
           </li>
          </SwipeAction>
         ))
        }
       </div>
      )
     })
    }
   </ul>
   <NavBar />
  </div>
 )
}
export default inject('newsletterState')((observer(Home)));