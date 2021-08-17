import React, { useEffect, useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { getGroupInfo, kickOff, transferOwner, forbidden, setAdmin } from "./request"
import { List, Button, Switch, SwipeAction, Toast } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
  const { push, goBack } = useHistory();
  const { location, userState, homeState } = props;
  const { state = {} } = location;
  const { user } = userState;
  const { setCurrentUser } = homeState;
  const [groupInfo, setGroupInfo] = useState<any>({})
  const [myRole, setMyRole] = useState('')
  useEffect(() => {
    if (!state.partnerCode) {
      push("/newsletter")
      return;
    }
    getGroupInfoHandle()
  }, [state])
  const getGroupInfoHandle = () => {
    getGroupInfo({ groupCode: state.partnerCode }).then(res => {
      setGroupInfo(res)
      returnRoleByMe(res)
    })
  }
  const setAdminHandle = (item: any) => {
    let isHas = groupInfo.adminMembers.filter((i: any) => i.code === item.code)
    setAdmin({ groupCode: groupInfo.code, userCode: item.code, commonStatus: isHas.length === 0 ? 'ENABLE' : 'DISABLE' }).then(() => {
      Toast.success('设置管理成功')
      Toast.success(isHas.length === 0 ? '设置管理成功' : '解除管理成功')
      getGroupInfoHandle()
    })
  }
  const transformGroup = (item: any) => {
    transferOwner({ groupCode: groupInfo.code, userCode: item.code }).then(() => {
      Toast.success('转让成功')
      getGroupInfoHandle()
    })
  }
  const kickOut = (item: any) => {
    kickOff({ groupCode: groupInfo.code, userCode: item.code }).then(() => {
      Toast.success('踢出成功')
      getGroupInfoHandle()
    })
  }
  const muteMember = (item: any) => {
    let isHas = groupInfo.forbiddenMembers.filter((i: any) => i.code === item.code)
    forbidden({ groupCode: groupInfo.code, userCode: item.code, commonStatus: isHas.length === 0 ? 'ENABLE' : 'DISABLE' }).then(() => {
      Toast.success(isHas.length === 0 ? '禁言成功' : '解除禁言成功')
      getGroupInfoHandle()
    })
  }
  const returnRoleByUsers = (user: any, users: any) => {
    if (user.code === users.owner.code) {
      return 'owner'
    }
    let admins = users.adminMembers.filter((item: any) => item.code === user.code)
    if (admins.length > 0) {
      return 'admin'
    }
    return 'member'
  }
  const forbiddenRole = (user: any) => {
    let admins = groupInfo.forbiddenMembers.map((item: any) => item.code)
    if (admins.includes(user.code)) {
      return 'forbidden'
    }
  }
  const returnRoleByMe = (users: any) => {
    if (user.code === users.owner.code) {
      setMyRole('owner')
      return
    }
    if (users.adminMembers.includes(user.code)) {
      setMyRole('admin')
      return
    }
    setMyRole('member')
  }
  const toChatPage = (item: any) => {
    setCurrentUser(item.partnerCode)
    push({ pathname: '/chat', state: item })
  }
  return (
    <div className="group-wrap">
      <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
      <div className="my-top">
        <img src={groupInfo.headIcon} alt="" />
        <p>
          <span>{groupInfo.nickName}</span>
          <span>圈子号: {groupInfo.code}</span>
        </p>
      </div>
      <List className="my-list">
        <List.Item extra={<i className="iconfont icon-fuzhi" style={{ fontSize: '24px' }} onClick={() => console.log("copy")}></i>}  >
          信息
     <List.Item.Brief>{groupInfo.code}</List.Item.Brief>
          <List.Item.Brief>邀请链接</List.Item.Brief>
        </List.Item>
        <div style={{ fontSize: '16px', textAlign: 'center', height: '30px', lineHeight: '30px', borderBottom: '1px solid #DDDDDD' }}>群成员</div>
        <div className="group-friend">
          {
            groupInfo.groupMembers && groupInfo.groupMembers.map((item: any, index: number) => {
              let role = returnRoleByUsers(item, groupInfo)
              let forbidden = forbiddenRole(item)
              return (
                <SwipeAction
                  style={{ backgroundColor: 'gray' }}
                  key={item.code}
                  autoClose
                  right={['owner', 'admin'].includes(myRole) ? [
                    {
                      text: ' 踢出 ',
                      onPress: () => kickOut(item),
                      style: { backgroundColor: '#F4333C', fontSize: '16px', color: 'white' },
                    },
                    {
                      text: forbidden ? '解除禁言' : ' 禁言 ',
                      onPress: () => muteMember(item),
                      style: { backgroundColor: '#ff9c00', fontSize: '16px', color: 'white' },
                    },
                  ] : []}
                  left={myRole === 'owner' ? [
                    {
                      text: '转让群',
                      onPress: () => transformGroup(item),
                      style: { backgroundColor: '#108ee9', fontSize: '16px', color: 'white' },
                    },
                    {
                      text: role === 'admin' ? '解除管理' : '设为管理',
                      onPress: () => setAdminHandle(item),
                      style: { backgroundColor: '#16ac15', fontSize: '16px', color: 'white' },
                    },
                  ] : []}
                >
                  <List.Item onClick={() => push('/friendInfo')}>
                    <div className="sign-friend">
                      <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" />
                      <div>
                        <span className="friend-name">{item.nickName}</span>
                        <p>
                          {role === 'owner' && <span className="owner">群主</span>}
                          {role === 'admin' && <span className="admin">管理员</span>}
                          {role === 'member' && <span className="member">成员</span>}
                          {['owner', 'admin'].includes(myRole) && forbidden && <span className="member">禁言</span>}
                          {/* <span className="online">在线</span> */}
                        </p>
                      </div>
                    </div>
                  </List.Item>
                </SwipeAction>
              )
            })
          }
        </div>
        {/* <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>通知</List.Item> */}
        {/* <List.Item extra={<Switch checked={checked} onChange={() => setChecked(!checked)} />}>拉黑</List.Item> */}
        <Button style={{ color: '#16ac15' }}
          icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>}
          onClick={() => {
            toChatPage(state)
          }}>发消息</Button>
      </List>
    </div>
  )
}
export default inject('homeState', 'userState')((observer(Home)));