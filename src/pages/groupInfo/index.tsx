import React, { useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { List, Button, Switch, SwipeAction } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
 const { push,goBack } = useHistory();
 const [checked, setChecked] = useState(false)
 return (
  <div className="group-wrap">
   <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
   <div className="my-top">
    <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
    <p>
     <span>我是前端!我是前端!</span>
     <span>圈子号: 12345576</span>
    </p>
   </div>
   <List className="my-list">
    <List.Item extra={<i className="iconfont icon-fuzhi" style={{ fontSize: '24px' }} onClick={() => console.log("copy")}></i>}  >
     信息
     <List.Item.Brief>12312312312</List.Item.Brief>
     <List.Item.Brief>邀请链接</List.Item.Brief>
    </List.Item>
    <div style={{ fontSize: '16px', textAlign: 'center', height: '30px', lineHeight: '30px', borderBottom: '1px solid #DDDDDD' }}>群成员</div>
    <div className="group-friend">
     {
      Array.from({ length: 20 }).map((item, index) => {
       return (
        <SwipeAction
         style={{ backgroundColor: 'gray' }}
         key={index}
         autoClose
         right={[
          {
           text: '踢出',
           onPress: () => console.log('delete'),
           style: { backgroundColor: '#F4333C', fontSize: '16px', color: 'white' },
          },
          {
           text: '禁言',
           onPress: () => console.log('delete'),
           style: { backgroundColor: '#ff9c00', fontSize: '16px', color: 'white' },
          },
         ]}
         left={[
          {
            text: '转让群',
            onPress: () => console.log('reply'),
            style: { backgroundColor: '#108ee9',  fontSize: '16px',color: 'white' },
          },
          {
            text: '设为管理',
            onPress: () => console.log('cancel'),
            style: { backgroundColor: '#16ac15', fontSize: '16px', color: 'white' },
          },
        ]}
         onOpen={() => console.log('global open')}
         onClose={() => console.log('global close')}
        >
         <List.Item onClick={()=>push('/friendInfo')}>
          <div className="sign-friend">
           <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" />
           <div>
            <span className="friend-name">我是名称</span>
            <p>
             <span className="leave">管理员</span>
             <span className="online">在线</span>
            </p>
           </div>
          </div>
         </List.Item>
        </SwipeAction>
       )
      })
     }
    </div>
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item>
    <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item>
    <Button style={{ color: '#16ac15' }} icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>}>发消息</Button>
    <Button style={{ color: 'red' }} icon={<i className="iconfont icon-tuichu" style={{ fontSize: '22px', color: 'red' }}></i>}>退出</Button>
   </List>
  </div>
 )
}
export default inject('homeState')((observer(Home)));