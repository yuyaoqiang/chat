import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react"
import { addFriend, editFriendRemark } from "./request"
import { useHistory } from "react-router-dom";
import { List, Button, Switch, Toast, Modal } from "antd-mobile";
import './style.scss'
import { avatarsMap } from "@utils/avatarData";
const prompt = Modal.prompt;
const Home = (props: any) => {
   const { push, goBack } = useHistory();
   const { newsletterState, homeState, chatState, location } = props;
   const { state = {} } = location;
   const { setCurrentUser } = homeState
   const { setChatUser, clearMsg } = chatState
   const { friends, initFriends } = newsletterState;
   const [userInfo, setUserInfo] = useState<any>({})
   const editRemark = (remark: string) => {
      setUserInfo({ ...userInfo, partnerRemark: remark })
      editFriendRemark({ userCode: userInfo.partnerCode, remark }).then(res => {
         Toast.success('修改成功')
         initFriends()
      })
   }
   useEffect(() => {
      if (!state.nickName) {
         push('/newsletter')
      }
      setUserInfo(state)
   }, [])

   return (
      <div className="my-wrap">
         <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
         <div className="my-top">
            <img src={avatarsMap[userInfo.headIcon]} alt="" />
            <div className="user-info-wrap">
               <p>
                  <span>{userInfo.nickName}</span>
                  <span>圈子号: {userInfo.partnerCode || userInfo.code}</span>
                  <span>备注: {userInfo.partnerRemark}
                     <i
                        style={{ fontSize: 30 }}
                        className="edit-icon iconfont icon-icon-"
                        onClick={() => prompt('备注', '请输入备注',
                           [
                              {
                                 text: '取消',
                                 onPress: value => { }
                              },
                              {
                                 text: '修改',
                                 onPress: value => editRemark(value),
                              },
                           ], 'default', undefined, ['请输入备注'])}></i>
                  </span>

               </p>
            </div>
         </div>
         <List className="my-list">
            {/* <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item> */}
            {/* <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item> */}
            <Button style={{ color: '#16ac15' }}
               icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>}
               onClick={() => {
                  setCurrentUser(userInfo.partnerCode)
                  setChatUser({ ...userInfo, senderCode: userInfo.partnerCode, oriToChatUserType: userInfo.userType })
                  push({ pathname: '/chat', state: userInfo })
               }}>发消息</Button>
         </List>
      </div >
   )
}
export default inject('newsletterState', 'homeState', 'chatState')((observer(Home)));