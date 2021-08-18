import React, { useState } from "react";
import NavBar from "@components/navBar"
import Avatar from "@components/avatar"
import { observer, inject } from "mobx-react"
import { setInfo, mine } from "./request"
import { useHistory } from "react-router-dom";
import { List, Button, Toast, Modal } from "antd-mobile";
import './style.scss'
const prompt = Modal.prompt;
const urls = [
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
 "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
]
const Home = (props: any) => {
 const { push } = useHistory();
 const { userState } = props;
 const { user, logout, setUserInfo } = userState;
 const [visible, setVisible] = useState(false)
 const logoutHandle = () => {
  logout()
 }
 const showAvatars = () => {
  setVisible(true)
 }
 const submitHeader = (imgUrl: string) => {
  setInfo({ userCode: user.code, headIcon: imgUrl, nickName: user.nickName  }).then(res => {
   setUserInfo();
   Toast.success('修改头像成功')
   setVisible(false)
  })
 }
 const submitNickName = (name: string) => {
  setInfo({ userCode: user.code, headIcon: user.headIcon, nickName: name }).then(res => {
   setUserInfo();
   Toast.success('修改昵称成功')
   setVisible(false)
  })
 }
 console.log(user)
 return (
  <div className="my-wrap">
   <div className="my-top">
    <img src={user.headIcon} alt="" onClick={showAvatars} />
    <p>
     <span className="name-wrap">
      <span>{user.nickName ? user.nickName : '请编辑名称'}</span>
      <i
       className="iconfont icon-icon-"
       style={{ fontSize: 30 }}
       onClick={() => prompt('昵称', '请输入昵称',
        [
         {
          text: '取消',
          onPress: value => { }
         },
         {
          text: '确定',
          onPress: value => { submitNickName(value) },
         },
        ], 'default', undefined, ['请输入昵称'])}></i>
     </span>
     <span className="group-number">圈子号: {user.code}</span>

    </p>
   </div>
   <List className="my-list">
    {/* <List.Item arrow="horizontal" onClick={() => push("/block")}>黑名单</List.Item> */}
    <List.Item arrow="horizontal" onClick={() => push("/changePwd")}>修改密码</List.Item>
    <Button style={{ color: 'red' }} onClick={logoutHandle}>退出</Button>
   </List>
   <NavBar />
   {visible && <Avatar imgData={urls} visible={visible} setVisible={setVisible} submit={submitHeader} />}
  </div>
 )
}
export default inject('userState')((observer(Home)));