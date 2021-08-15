import React, { useRef, useState, useEffect, useCallback } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { queryPagesByParams } from "./request";
import { send } from "@utils/webSocket"
import { subscriber } from "@utils/publish"
import { uuid } from "@utils/helpers"
import "emoji-mart/css/emoji-mart.css";
//@ts-ignore
import { Picker } from 'emoji-mart'
import { TextareaItem } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
  const { userState, location } = props;
  const { userInfo } = userState;
  const { state = {} } = location;
  const [showEmojiModal, setEmojiModal] = useState(false)
  const [data, setData] = useState<any>([])
  const [content, setContent] = useState('')
  const [scrollInfo, setScrollInfo] = useState({
    hasBottom: false,
    hasTop: false,
    scrollHeight: 400
  })
  const { push } = useHistory();
  const ref: any = useRef(null);
  const chatWrapRef: any = useRef(null);
  //  获取历史数据
  const requestDataByPage = () => {
    queryPagesByParams({ page: 1, pageNumber: 1, rows: 20, pageSize: 20, size: 20, receiverCode: state.partnerCode }).then(res => {
      const { content, last }: any = res;
      subscriber('GET_CHAT_MSG', getSocketMsg)
      setData(content.reverse())
      // fixedCurrentScrollLocation()
      scrollToBottom();
    }).catch(err => {
    })
  }
  const getSocketMsg = useCallback((a) => {
    setData([...data])
  }, [data])

  // 提交消息
  const submit = () => {
    send({
      cmdKey: 'SEND_CHAT_MSG',
      chatMsg: content,
      chatPartnerCode: state.partnerCode
    })
    let msg = {
      id: uuid(),
      senderCode: userInfo.code,
      msg: content
    }
    setContent('')
    setEmojiModal(false)
    setData([...data, msg])
    setTimeout(() => {
      scrollToBottom();
    }, 16);
  }

  const upLoadHandle = () => {

  }
  const fixedCurrentScrollLocation = () => {
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight - scrollInfo.scrollHeight - 20
  }

  // 滚回底部
  const scrollToBottom = () => {
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  }
  const throttling = (fn: Function, wait: number, maxTimelong: number,arg:any) => {
    var timeout: any = null,
      startTime = new Date().getTime();
    return function () {
      if (timeout !== null) clearTimeout(timeout);
      var curTime = new Date().getTime();
      if (curTime - startTime >= maxTimelong) {
        fn(arg);
        startTime = curTime;
      } else {
        timeout = setTimeout(fn, wait);
      }
    }
  }

  // 获取scroll详情
  const onScrollHandle = (event: any) => {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const hasBottom = (clientHeight + scrollTop === scrollHeight)
    const hasTop = scrollTop <= 0 ? true : false
    setScrollInfo({ hasBottom, hasTop, scrollHeight })
    console.log(hasBottom, hasTop, scrollHeight)
  }
  useEffect(() => {
    if (state.partnerCode) {
      requestDataByPage()
      return;
    }
    push('/')
  }, [])

  useEffect(() => {
    if (scrollInfo.hasBottom) {
      setTimeout(() => {
        scrollToBottom();
      }, 16);
    }
  }, [data])

  useEffect(() => {
    if (scrollInfo.hasTop) {
      requestDataByPage()
    }
  }, [scrollInfo])

  useEffect(() => {
    if (chatWrapRef.current) {
      chatWrapRef.current.addEventListener('scroll',(arg:any)=> throttling(onScrollHandle, 60, 100,arg));
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
        <span className="name">{userInfo.nickName}</span>
        <span className="content">{item.msg}</span>
      </p>
      <img src={userInfo.headIcon} alt="" />
    </li>
  }
  const timeRender = () => {
    return <p className="chat-time">7-18 12:12</p>
  }
  return (
    <div className="main-chat-wrap">
      <header>
        <i className=" iconfont icon-fanhui" style={{ fontSize: 24, color: '#333', left: '10px', }} onClick={() => push("/")}></i>
        <span>{state.nickName}</span>
        <i className=" iconfont icon-gengduo" style={{ fontSize: 24, color: '#333', right: '20px', }} onClick={() => push("/groupInfo")}></i>
      </header>
      <main className="chat-wrap">
        <ul ref={chatWrapRef}>
          {
            scrollInfo.hasTop && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '14px', color: '#afafaf' }}>加载中</div>
          }
          {
            data.map((item: any) => {
              return <React.Fragment key={item.id}>
                {timeRender()}
                {item.senderCode !== userInfo.code && leftRender(item)}
                {item.senderCode === userInfo.code && rightRender(item)}
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
      <footer>
        <TextareaItem rows={2} labelNumber={1} value={content} onChange={(value: any) => setContent(value)} />
        <div>
          <i onClick={() => setEmojiModal(true)} className="iconfont icon-expressions" style={{ fontSize: 30, marginRight: 10, marginLeft: 10 }}></i>
          <i className="iconfont icon-paper-full" style={{ fontSize: 30, color: '#16ac15' }} onClick={() => submit()}></i>
        </div>
      </footer>
    </div>
  )
}
export default inject('commonState', 'homeState', 'userState')((observer(Home)));