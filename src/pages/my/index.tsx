import React, { useState } from "react";
import NavBar from "@components/navBar"
import Avatar from "@components/avatar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push } = useHistory();
 const { userState } = props;
 const { userInfo, logout } = userState;
 const logoutHandle = () => {
  logout()
 }
 const showAvatars = () => {

 }
 return (
  <div className="my-wrap">
   <div className="my-top">
    <img src={userInfo.headIcon} alt="" onClick={showAvatars}/>
    <p>
     <span>{userInfo.nickName}</span>
     <span>圈子号: {userInfo.code}</span>
    </p>
   </div>
   <List className="my-list">
    <List.Item arrow="horizontal" onClick={() => push("/block")}>黑名单</List.Item>
    <List.Item arrow="horizontal" onClick={() => push("/changePwd")}>修改密码</List.Item>
    <Button style={{ color: 'red' }} onClick={logoutHandle}>退出</Button>
   </List>
   <NavBar />
   <Avatar imgData={["https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=0&spn=0&di=94380&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2681504758%2C1624692466&os=3785398915%2C710526787&simid=0%2C0&adpicid=0&lpn=0&ln=2066&fr=&fmq=1629130011229_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=head&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F06%2F20200506110929_iajqi.jpg%26refer%3Dhttp%3A%2F%2Fc-ssl.duitang.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1631722021%26t%3Dc3602af3940393f8df318a54fc55ec41&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3D8dnb8nda09&gsm=1&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined"]}/>
  </div>
 )
}
export default inject('userState')((observer(Home)));