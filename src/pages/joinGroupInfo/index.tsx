import React, { useEffect, useState } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { copyArticle } from "@utils/helpers"
import { useHistory } from "react-router-dom";
import { getGroupInfo, invitation } from "./request"
import { List, Button } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
  const { push, goBack } = useHistory();
  const { location, userState, homeState, chatState } = props;
  const { state = {} } = location;
  const { user } = userState;
  const { setCurrentUser } = homeState;
  const { setChatUser } = chatState;
  const [groupInfo, setGroupInfo] = useState<any>({})
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
  const invitationHandle = (state: any) => {
    invitation({ invitationLink: state.invitationLink }).then(() => {
      setChatUser({ oriToChatUserName: state.nickName, oriToChatUserCode: state.code, oriToChatUserType: 'GROUP' })
      setCurrentUser(state.code)
      push({ pathname: '/chat', state: { partnerCode: state.code, oriToChatUserNickName: state.nickName, oriToChatUserCode: state.code, oriToChatUserType: 'GROUP' } })
    })

  }
  const toChatPage = (item: any) => {
    setChatUser({ ...item, oriToChatUserCode: item.partnerCode, oriToChatUserType: item.userType })
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
              return (
                <List.Item onClick={() => push('/friendInfo')} key={item.code}>
                  <div className="sign-friend">
                    <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" />
                    <div>
                      <span className="friend-name">{item.nickName}</span>
                      <p>
                        {role === 'owner' && <span className="owner">群主</span>}
                        {role === 'admin' && <span className="admin">管理员</span>}
                        {role === 'member' && <span className="member">成员</span>}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )
            })
          }
        </div>
        <Button style={{ color: '#16ac15' }}
          icon={<i className="iconfont icon-liaotian_jihuo" style={{ fontSize: '22px', color: '#16ac15' }}></i>}
          onClick={() => {
            invitationHandle(state)
          }}>加入群聊</Button>
      </List>
    </div>
  )
}
export default inject('homeState', 'userState', 'chatState')((observer(Home)));