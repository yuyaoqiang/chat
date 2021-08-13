import React, { useRef, useState, useEffect } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { queryPagesByParams } from "./request";
import { send } from "@utils/webSocket"
import "emoji-mart/css/emoji-mart.css";
//@ts-ignore
import { Picker } from 'emoji-mart'
import { TextareaItem } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
  const { homeState, commonState } = props;
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

  const requestDataByPage = () => {
    let mockData = ['我1', '我', '我', '我', '我', '我']
    setTimeout(() => {
      setData([...mockData, ...data])
      fixedCurrentScrollLocation()
    }, 200);
  }
  // 提交消息
  const submit = () => {
    send(content)
    setContent('')
    setEmojiModal(false)
    setData([...data, content])
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
    ref.current.scrollIntoView({ behavior: "smooth" });
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
    if (scrollInfo.hasBottom) {
      scrollToBottom();
    }
  }, [data])

  useEffect(() => {
    if (scrollInfo.hasTop) {
      requestDataByPage()
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
        <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
        <p>
          <span className="name">名称</span>
          <span className="content">{item}</span>
        </p>
      </li>
    )
  }
  const rightRender = (item: any) => {
    return <li className="chat-right-wrap">
      <p>
        <span className="name">名称</span>
        <span className="content">{item}</span>
      </p>
      <img src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg" alt="" />
    </li>
  }
  const timeRender = () => {
    return <p className="chat-time">7-18 12:12</p>
  }
  return (
    <div className="main-chat-wrap">
      <header>
        <i className=" iconfont icon-fanhui" style={{ fontSize: 24, color: '#333', left: '10px', }} onClick={() => push("/")}></i>
        <span>聊天页</span>
        <i className=" iconfont icon-gengduo" style={{ fontSize: 24, color: '#333', right: '20px', }} onClick={() => push("/groupInfo")}></i>
      </header>
      <main className="chat-wrap">
        <ul ref={chatWrapRef}>
          {
            scrollInfo.hasTop && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '14px', color: '#afafaf' }}>加载中</div>
          }
          {
            data.map((item: any, index: number) => {
              return <React.Fragment key={index}>
                {timeRender()}
                {index % 2 == 1 && leftRender(item)}
                {index % 2 == 0 && rightRender(item)}
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
          <i className="iconfont icon-paper-full" style={{ fontSize: 30, color: '#16ac15' }} onClick={submit}></i>
        </div>
      </footer>
    </div>
  )
}
export default inject('commonState', 'homeState')((observer(Home)));