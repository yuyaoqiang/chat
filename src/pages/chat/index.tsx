import React, { useRef, useState, useEffect } from "react";
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { queryPagesByParams, invitationLink } from "./request";
import { getGroupInfo } from "@pages/groupInfo/request";
import { send } from "@utils/webSocket"
import { uuid } from "@utils/helpers"
import { Modal, Toast } from "antd-mobile"
import "emoji-mart/css/emoji-mart.css";
//@ts-ignore
import { Picker } from 'emoji-mart'
import { TextareaItem } from "antd-mobile";
import { mm_dd_hh_mm_ss3 } from "@utils/dataTime";
import dayjs from "dayjs";
import './style.scss'

const Chat = (props: any) => {
  const { push, goBack } = useHistory();
  const ref: any = useRef(null);
  const chatWrapRef: any = useRef(null);
  const { userState, location, chatState, newsletterState, homeState } = props;
  const { setHistory, chatsData, sendMsg } = chatState;
  const { delMsgByCode } = homeState;
  const { friends } = newsletterState
  const { state = {} } = location;
  const { user } = userState;
  const [content, setContent] = useState('')
  const [groupInfo, setGroupInfo] = useState<any>({})
  const [showEmojiModal, setEmojiModal] = useState(false)
  const [forbiddenMember, setHasForbiddenMember] = useState(false)
  const [callVisible, setCallVisible] = useState(false)
  const [pageOption, setPageOption] = useState({ page: 1, size: 20, isDownLoading: false, last: false })
  const [scrollInfo, setScrollInfo] = useState({ hasBottom: false, hasTop: false, scrollHeight: 400 })

  //  获取历史数据
  const requestDataByPage = () => {
    queryPagesByParams({ ...pageOption, receiverCode: state.partnerCode }).then(res => {
      const { content, last, number }: any = res;
      setPageOption({ ...pageOption, last, isDownLoading: false, page: number + 2 })
      setHistory(content.reverse())
      fixedCurrentScrollLocation()
    }).catch(err => {
      if (err.data.message === '无权查看此群信息') {
        delMsgByCode(state)
        Toast.fail('您已不在该群组')
        push('/')
        return;
      }
      if (err.data.message === '用户不存在') {
        delMsgByCode(state)
        Toast.fail('该群组已解散')
        push('/')
        return;
      }
    })
  }
  // 提交消息
  const submit = () => {
    if(content.trim().length===0)return;
    let msg = { id: uuid(), senderCode: user.code, msg: content, sendTime: new Date().getTime() }
    const flag = content.includes('INVITATION');
    if (flag) {
      invitationLink({ invitationLink: content.trim() }).then((res: any) => {
        let groupInfo = { code: res.code, nickName: res.nickName, headIcon: res.headIcon, invitationLink: content.trim() }
        setContent('')
        setEmojiModal(false)
        send({ cmdKey: 'SEND_CHAT_MSG', chatMsg: groupInfo, chatPartnerCode: state.partnerCode })
        sendMsg({ ...msg, content: groupInfo })
        setTimeout(() => {
          scrollToBottom();
        }, 16);
      })
    } else {
      setContent('')
      setEmojiModal(false)
      sendMsg(msg)
      send({ cmdKey: 'SEND_CHAT_MSG', chatMsg: content, chatPartnerCode: state.partnerCode })
      setTimeout(() => {
        scrollToBottom();
      }, 16);
    }

  }
  // 下拉加载更多,固定当前位置,防止滚动
  const fixedCurrentScrollLocation = () => {
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight - scrollInfo.scrollHeight
  }
  // 滚回底部
  const scrollToBottom = () => {
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  }
  // 获取scroll详情
  const onScrollHandle = (event: any) => {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const hasBottom = (clientHeight + scrollTop === scrollHeight)
    const hasTop = scrollTop <= 0 ? true : false
    setScrollInfo({ hasBottom, hasTop, scrollHeight })
  }
  const getGroupInfoHandle = () => {
    getGroupInfo({ groupCode: state.partnerCode }).then(res => {
      setGroupInfo(res)
    })
  }
  useEffect(() => {
    if (state.partnerCode) {
      requestDataByPage()
      if (state.userType === 'GROUP') getGroupInfoHandle()
      if (state.oriToChatUserType === 'GROUP') getGroupInfoHandle()
      return;
    }
    push('/')
  }, [])

  useEffect(() => {
    if (content) {
      let str = content.substr(content.length - 1, 1)
      if (str === '@') {
        setCallVisible(true)
      }
    }
  }, [content])
  useEffect(() => {
    if (scrollInfo.hasBottom) {
      setTimeout(() => {
        scrollToBottom();
      }, 16);
    }
  }, [chatsData])

  useEffect(() => {
    if (pageOption.last) return;
    if (scrollInfo.hasTop && !pageOption.isDownLoading) {
      requestDataByPage()
      setPageOption({ ...pageOption, isDownLoading: true })
    }
  }, [scrollInfo])

  useEffect(() => {
    if (chatWrapRef.current) {
      chatWrapRef.current.addEventListener('scroll', onScrollHandle);
    }
  }, [chatWrapRef.current])
  useEffect(() => {
    if (groupInfo.forbiddenMembers) {
      hasForbidden()
    }
  }, [groupInfo])
  const generateInvitation = (item: any) => {
    const flag = item.includes('INVITATION');
    return flag;
  }
  const hasForbidden = () => {
    let hasForbidden = groupInfo.forbiddenMembers.filter((item: any) => item.code === user.code)
    setHasForbiddenMember(hasForbidden.length > 0 ? true : false)
  }
  const joinGroup = (groupInfo: any) => {
    if (groupInfo.invitationLink) {
      push({ pathname: '/joinGroup', state: { ...groupInfo, partnerCode: groupInfo.code } })
    }
  }
  const searchGroupInfo = (code: any) => {
    Toast.loading('加载中')
    getGroupInfo({ groupCode: code }).then(res => {
      joinGroup(res)
      Toast.hide()
    })
  }
  const leftRender = (item: any) => {
    let groupInfo: any = {}
    let flag = generateInvitation(item.msg);
    if (flag) {
      groupInfo = JSON.parse(item.msg)
    }
    return (
      <li className="chat-left-wrap">
        <img src={item.senderHeadIcon} alt="" />
        {!flag ? <p key="msg">
          <span className="name">{item.senderNickName}</span>
          <span className="content">{item.msg}</span>
        </p> :
          <p key="invitation" onClick={() => searchGroupInfo(groupInfo.code)}>
            <span className="name">{item.senderNickName}</span>
            <span className="group-info-content">
              <img src={groupInfo.headIcon} alt="" />
              <span className="group-name">
                <span>群名称:{groupInfo.nickName}</span>
                <span>群号:{groupInfo.code}</span>
              </span>
            </span>
          </p>
        }
      </li>
    )


  }
  const rightRender = (item: any) => {
    let groupInfo: any = {}
    let flag = generateInvitation(item.msg);
    if (flag) {
      groupInfo = JSON.parse(item.msg)
    }
    return <li className="chat-right-wrap">
      {!flag ? <p key="msg">
        <span className="name">{user.nickName}</span>
        <span className="content">{item.msg}</span>
      </p> :
        <p key="invitation">
          <span className="name">{user.nickName}</span>
          <span className="group-info-content" onClick={() => searchGroupInfo(groupInfo.code)}>
            <span className="group-name">
              <span>群名称:{groupInfo.nickName}</span>
              <span>群号:{groupInfo.code}</span>
            </span>
            <img src={groupInfo.headIcon} alt="" />
          </span>
        </p>
      }
      <img src={user.headIcon} alt="" />
    </li>
  }
  const timeRender = (nowChat: any, beforeChat: any) => {
    if (nowChat && beforeChat) {
      let time = dayjs(nowChat.sendTime).valueOf() - dayjs(beforeChat.sendTime).valueOf()
      if (time > 30000) {
        return <p className="chat-time">{mm_dd_hh_mm_ss3(nowChat.sendTime)}</p>
      }
      return null
    }
    return <p className="chat-time">{mm_dd_hh_mm_ss3(nowChat.sendTime)}</p>
  }
  return (
    <div className="main-chat-wrap">
      <header>
        <i className=" iconfont icon-fanhui"
          style={{ fontSize: 24, color: '#333', left: '10px', }}
          onClick={() => {
            goBack()
          }}></i>
        {(state.userType === 'USER' || state.oriToChatUserType === 'USER') && <span>{state.nickName || state.senderNickName}</span>}
        {(state.oriToChatUserType === 'GROUP' || state.userType === 'GROUP') && <span>{state.oriToChatUserNickName || state.nickName}</span>}
        {((state.oriToChatUserType === 'GROUP' || state.userType === 'GROUP'))
          && <i className=" iconfont icon-gengduo"
            style={{ fontSize: 24, color: '#333', right: '20px', }}
            onClick={() => {
              push({ pathname: "/groupInfo", state: state })
            }}></i>}
      </header>
      <main className="chat-wrap">
        <ul ref={chatWrapRef}>
          {
            scrollInfo.hasTop && !pageOption.last && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '14px', color: '#afafaf' }}>加载中</div>
          }
          {
            scrollInfo.hasTop && pageOption.last && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '14px', color: '#afafaf' }}>没有更多消息了</div>
          }
          {
            chatsData.map((item: any, index: number) => {
              return <React.Fragment key={item.id}>
                {timeRender(item, chatsData[index - 1])}
                {item.senderCode !== user.code && leftRender(item)}
                {item.senderCode === user.code && rightRender(item)}
              </React.Fragment>
            })
          }
          <div ref={ref} ></div>
        </ul>
      </main>
      {
        showEmojiModal && <Picker
          set='apple'
          title="选择表情"
          sheetSize={32}
          onOver={() => { console.log('onOver') }}
          onLeave={() => { console.log('leave') }}
          onSelect={(emoji: any) => setContent(content + emoji.native)}
        />
      }
      <Modal
        popup
        visible={callVisible}
        onClose={() => { setCallVisible(false) }}
        animationType="slide-up"
      >
        {
          friends.map((item: any) => {
            if (item.userType === 'GROUP') return;
            return <p key={item.nickName} onClick={() => {
              setCallVisible(false)
              setContent(content + item.nickName + ' ')
            }}>{item.nickName}</p>
          })
        }
      </Modal>
      {
        !forbiddenMember ? (
          <footer>
            <TextareaItem rows={2} labelNumber={1} value={content} onChange={(value: any) => {
              setContent(value)
            }} />
            <div>
              <i onClick={() => setEmojiModal(true)} className="iconfont icon-expressions" style={{ fontSize: 30, marginRight: 10, marginLeft: 10 }}></i>
              <i className="iconfont icon-paper-full" style={{ fontSize: 30, color: '#16ac15' }} onClick={() => submit()}></i>
            </div>
          </footer>
        ) : <footer style={{ background: '#878787', textAlign: 'center', justifyContent: 'center' }}> <span style={{ color: '#FFF', fontSize: 24, textAlign: 'center' }}>您已被禁言</span> </footer>
      }
    </div >
  )
}
export default inject('commonState', 'chatState', 'homeState', 'userState', 'newsletterState')((observer(Chat)));