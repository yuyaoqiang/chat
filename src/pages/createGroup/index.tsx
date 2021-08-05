import React from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { Checkbox } from "antd-mobile";
import { pySegSort } from "@entity/PinYin"
import './style.scss'
const Home = (props: any) => {
 const { push, goBack } = useHistory();
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
 return (
  <div className="create-group-wrap">
   <header>
    <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
    <span>创建群组</span>
   </header>
   <ul className="chats-wrap">
    {
     a.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((d: any) => (
          <Checkbox.CheckboxItem key={d} onChange={() => console.log(d)}>
           <li className="chat-item" key={d} >
            <p className="chat-item-left">
             <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
            </p>
            <div className="chat-item-right">
             <p className="chat-name-date">
              <span>{d.nickName}</span>
             </p>
            .</div>
           </li>
          </Checkbox.CheckboxItem>

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