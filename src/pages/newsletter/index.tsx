import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { SearchBar, SwipeAction, Badge,Button } from "antd-mobile";
import { pySegSort } from "@entity/PinYin"
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { homeState } = props;
 const names = [
  {
   id: 1,
   nickName: 'z'
  },
  {
   id: 2,
   nickName: 'a'
  },
  {
   id: 3,
   nickName: '余'
  },
  {
   id: 4,
   nickName: '张'
  },
  {
   id: 5,
   nickName: '哈'
  },
  {
   id: 6,
   nickName: 'h'
  },
  {
   id: 7,
   nickName: '9'
  },
  {
   id: 8,
   nickName: '@#4'
  },
  {
   id: 9,
   nickName: 'c'
  },
  {
   id: 10,
   nickName: 'F'
  },
  {
   id: 11,
   nickName: 'G'
  },
  {
   id: 12,
   nickName: '流'
  },
  {
   id: 13,
   nickName: '李'
  },
  {
   id: 14,
   nickName: '欣'
  },
 ]
 let a = pySegSort(names)
 console.log(a)
 return (
  <div className="newsletter-wrap">
   <header>
    <span>通讯录</span>
    <i className="add-icon iconfont icon-jiahaoyou" style={{ fontSize: 24, color: '#333' }}></i>
   </header>
   <SearchBar placeholder="Search" maxLength={8} />
   <ul className="new-people-wrap">
    <li className="chat-item">
     <p className="chat-item-left">
      <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
     </p>
     <div className="flex-center">
      <p className="chat-name-date">
       <span>新的好友</span>
      </p>
      <p className="chat-btn">
      <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>通过</Button>
      <Button type="warning" inline  size="small" style={{ marginRight: '4px' }}>拒绝</Button>
      </p>
     </div>
    </li>
   </ul>
   <ul className="chats-wrap">
    {
     a.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((d: any) => (
          <SwipeAction
           style={{ backgroundColor: 'gray' }}
           key={item.initial}
           autoClose
           right={[
            {
             text: '删除',
             onPress: () => console.log('delete'),
             style: { backgroundColor: '#F4333C', fontSize:  '16px', color: 'white' },
            },
           ]}
           onOpen={() => console.log('global open')}
           onClose={() => console.log('global close')}
          >
           <li className="chat-item" onClick={()=>push('/friendInfo')}>
            <p className="chat-item-left">
             <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
            </p>
            <div className="chat-item-right">
             <p className="chat-name-date">
              <span>{d.nickName}</span>
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
export default inject('homeState')((observer(Home)));