import React, { useRef, useState, useEffect } from "react";
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { queryPagesByParams } from "./request";
import { send } from "@utils/webSocket"
import { uuid } from "@utils/helpers"
import { Modal } from "antd-mobile"
import "emoji-mart/css/emoji-mart.css";
//@ts-ignore
import { Picker } from 'emoji-mart'
import { TextareaItem } from "antd-mobile";
import './style.scss'
import { mm_dd_hh_mm_ss3 } from "@utils/dataTime";
import dayjs from "dayjs";
const Chat = (props: any) => {
  const { push, goBack } = useHistory();
  const ref: any = useRef(null);
  const chatWrapRef: any = useRef(null);
  const { userState, location, chatState, newsletterState } = props;
  const { setHistory, chatsData, sendMsg, setChatUser } = chatState;
  const { friends } = newsletterState
  const { state = {} } = location;
  const { user } = userState;
  const [content, setContent] = useState('')
  const [showEmojiModal, setEmojiModal] = useState(false)
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
    })
  }

  // 提交消息
  const submit = () => {
    send({ cmdKey: 'SEND_CHAT_MSG', chatMsg: content, chatPartnerCode: state.partnerCode })
    let msg = { id: uuid(), senderCode: user.code, msg: content, sendTime: new Date().getTime() }
    setContent('')
    setEmojiModal(false)
    sendMsg(msg)
    setTimeout(() => {
      scrollToBottom();
    }, 16);
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

  useEffect(() => {
    if (state.partnerCode) {
      requestDataByPage()
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

  const leftRender = (item: any) => {
    return (
      <li className="chat-left-wrap">
        <img src={item.senderHeadIcon} alt="" />
        <p>
          <span className="name">{item.senderNickName}</span>
          <span className="content">{item.msg}</span>
        </p>
      </li>
    )
  }
  const rightRender = (item: any) => {
    return <li className="chat-right-wrap">
      <p>
        <span className="name">{user.nickName}</span>
        <span className="content">{item.msg}</span>
      </p>
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
        {((state.oriToChatUserType === 'GROUP' || state.userType === 'GROUP')) && <i className=" iconfont icon-gengduo" style={{ fontSize: 24, color: '#333', right: '20px', }} onClick={() => push("/groupInfo")}></i>}
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
      <footer>
        <TextareaItem rows={2} labelNumber={1} value={content} onChange={(value: any) => {
          setContent(value)
        }} />
        <div>
          <i onClick={() => setEmojiModal(true)} className="iconfont icon-expressions" style={{ fontSize: 30, marginRight: 10, marginLeft: 10 }}></i>
          <i className="iconfont icon-paper-full" style={{ fontSize: 30, color: '#16ac15' }} onClick={() => submit()}></i>
        </div>
      </footer>
    </div >
  )
}
export default inject('commonState', 'chatState', 'userState', 'newsletterState')((observer(Chat)));