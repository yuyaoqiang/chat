import React, { useState } from "react";
import HeaderGroup from ".//headerGroup"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { Checkbox, Toast } from "antd-mobile";
import { create } from "./request";
import './style.scss'
const Home = (props: any) => {
 const { push, goBack } = useHistory();
 const { homeState, newsletterState } = props;
 const { friendsSorted,initFriends } = newsletterState;
 const [groupInfo, setGroupInfo] = useState<any>({ groupNickName: '', userCode: [], groupHeadIcon: "", notice: false })
 const checkedFriends = (code: any) => {
  const { userCode } = groupInfo
  const index = userCode.indexOf(code)
  if (index !== -1) {
   userCode.splice(index, 1)
  } else {
   userCode.push(code)
  }
  setGroupInfo({ ...groupInfo, userCode })
 }
 const createGroup = () => {
  create(groupInfo).then(res => {
   Toast.success('创建成功');
   initFriends();
   push("/newsletter")
  })
 }
 return (
  <div className="create-group-wrap">
   <header>
    <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
    <span>创建群组</span>
   </header>
   < HeaderGroup
    groupInfo={groupInfo}
    setGroupInfo={setGroupInfo}
   />
   <ul className="chats-wrap">
    {
     friendsSorted.map((item: any) => {
      return (
       <div key={item.initial}>
        <p className="sort-word">{item.initial}</p>
        {
         item.data.map((user: any) => (
          <Checkbox.CheckboxItem key={user.partnerCode} checked={groupInfo.userCode.includes(user.partnerCode)} onClick={() => checkedFriends(user.partnerCode)}>
           <li className="chat-item" key={user.partnerCode} >
            <p className="chat-item-left">
             <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
            </p>
            <div className="chat-item-right">
             <p className="chat-name-date">
              <span>{user.nickName}</span>
             </p>
            </div>
           </li>
          </Checkbox.CheckboxItem>
         ))
        }
       </div>
      )
     })
    }
   </ul>
   <div className="group-chat-submit">
    <span onClick={createGroup}><i className="iconfont icon-liaotian" style={{ fontSize: 24, color: '#fff' }}></i>发起群聊</span>
   </div>
  </div>
 )
}
export default inject('homeState', 'newsletterState')((observer(Home)));