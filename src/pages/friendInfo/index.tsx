import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react"
import { addFriend } from "./request"
import { useHistory } from "react-router-dom";
import { List, Button, Switch, Toast, InputItem } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push, goBack } = useHistory();
 const { newsletterState, location } = props;
 const { state = {} } = location;
 const { friends } = newsletterState;
 const [checked, setChecked] = useState(false)
 const [isFriend, setIsFriend] = useState<any>(null)
 const hasFriend = () => {
  let hasFriend = friends.filter((friend: any) => friend.code === state.code)
  if (hasFriend.length > 0) {
   setIsFriend(true)
  } else {
   setIsFriend(false)
  }
 }
 const addFriendHandle = () => {
  Toast.loading('正在添加中', 0)
  addFriend({ friendCode: state.code }).then(res => {
   Toast.success('已发出添加好友请求')
   push('/newsletter')
  })
 }
 useEffect(() => {
  if (!state.nickName) {
   push('/newsletter')
  }
  hasFriend()
 }, [])
 return (
  <div className="my-wrap">
   <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
   <div className="my-top">
    <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
    <div>
     <p>
      <span>{state.nickName}</span>
      <span>圈子号: {state.partnerCode}</span>
     </p>
     <InputItem clear placeholder="auto focus" >备注</InputItem>
    </div>
   </div>
   <List className="my-list">
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item>
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item>
    {
     isFriend && <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>} onClick={() => push({ pathname: '/chat', state: state })}>发消息</Button>
    }
    {
     !isFriend && <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-jiahao" style={{ fontSize: '22px', color: '#16ac15' }}></i>} onClick={addFriendHandle}>加好友</Button>
    }
   </List>
  </div>
 )
}
export default inject('newsletterState')((observer(Home)));