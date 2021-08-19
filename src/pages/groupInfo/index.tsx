import React, { useEffect, useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { copyArticle } from "@utils/helpers"
import { useHistory } from "react-router-dom";
import { getGroupInfo, kickOff, transferOwner, forbidden, setAdmin, dismiss } from "./request"
import { List, Button, Switch, SwipeAction, Toast } from "antd-mobile";
import './style.scss'
import { yyyymmddhhmmss } from "@utils/dataTime";
import { avatarsMap } from "@utils/avatarData";
const Home = (props: any) => {
  const { push, goBack } = useHistory();
  const { location, userState, homeState, chatState } = props;
  const { state = {} } = location;
  const { user } = userState;
  const { setCurrentUser, delMsgByCode } = homeState;
  const { setChatUser } = chatState;
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
    getGroupInfo({ groupCode: state.partnerCode }).then((res: any) => {
      let isHas = res.groupMembers.filter((member: any) => member.code === user.code)
      if (isHas.length === 0) {
        Toast.fail('您不属于该群组');
        push('/newsletter')
        return;
      }
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
    let admins = users.adminMembers.filter((item: any) => item.code === user.code)
    if (admins.length > 0) {
      setMyRole('admin')
      return;
    }
    setMyRole('member')
  }
  const toChatPage = (item: any) => {
    setChatUser({ ...item, oriToChatUserCode: item.partnerCode, oriToChatUserType: 'GROUP' })
    setCurrentUser(item.partnerCode)
    push({ pathname: '/chat', state: { ...item, oriToChatUserCode: item.partnerCode, oriToChatUserType: 'GROUP' } })
  }
  const disbandGroup = () => {
    dismiss({ groupCode: state.partnerCode }).then((res) => {
      state.oriToChatUserType = state.userType;
      state.oriToChatUserCode = state.partnerCode;
      Toast.success('群组已解散')
      delMsgByCode(state)
      push('/newsletter')
    })
  }
  const toChatByMember = (item: any) => {
    if (item.code === user.code) {
      push('/my')
      return;
    }
    let latest = Object.assign({}, item);
    latest.userType = latest.chatUserType
    latest.partnerCode = latest.code
    push({ pathname: '/chat', state: latest })
  }

  return (
    <div className="group-wrap">
      <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
      <div className="my-top">
        <img src={avatarsMap[groupInfo.headIcon]} alt="" />
        <p>
          <span>{groupInfo.nickName}</span>
          <span>圈子号: {groupInfo.code}</span>
        </p>
      </div>
      <List className="my-list">
        <List.Item extra={<i className="iconfont icon-fuzhi" style={{ fontSize: '24px' }} onClick={() => copyArticle(groupInfo.invitationLink)}></i>}  >
          信息
     <List.Item.Brief>{groupInfo.invitationLink}</List.Item.Brief>
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
                  <List.Item onClick={() => toChatByMember(item)}>
                    <div className="sign-friend">
                      <img src={avatarsMap[item.headIcon]} />
                      <div className="" style={{ width: '80%', display: 'flex', fontSize: 12, alignItems: 'center', justifyContent: 'space-between' }}>
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
                        <div className="member-info" style={{ display: 'flex', flexFlow: 'column' }} >
                          {['admin', 'owner'].includes(myRole) && <span>登录时间:{yyyymmddhhmmss(item.lastAccessTime)}</span>}
                          {['admin', 'owner'].includes(myRole) && <span>登录IP:{item.lastAccessIp}</span>}
                        </div>
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
        {myRole === 'owner' &&
          <Button style={{ color: 'red' }}
            onClick={() => {
              disbandGroup()
            }}>解散群组</Button>}
      </List>
    </div>
  )
}
export default inject('homeState', 'userState', 'chatState')((observer(Home)));