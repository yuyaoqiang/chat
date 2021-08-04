import React, { useRef, useState, useEffect } from "react";
import NavBar from "@components/navBar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { queryPagesByParams } from "./request";
import "emoji-mart/css/emoji-mart.css";
//@ts-ignore
import { Picker } from 'emoji-mart'
import { TextareaItem } from "antd-mobile";
import './style.scss'
const Home = (props: any) => {
  const { homeState, commonState } = props;
  const [showEmojiModal, setEmojiModal] = useState(false)
  const [content, setContent] = useState('')
  const { push } = useHistory();
  const ref: any = useRef(null);
  const row = (rowData: any, sectionID: any, rowID: any) => {
    console.log(rowID)
    return (
      <li className="chat-item" key={rowID}>
        
      </li>
    );
  };
  return (
    <div className="main-chat-wrap">
      <header>
        <i className=" iconfont icon-fanhui" style={{ fontSize: 24, color: '#333', left: '10px', }} onClick={() => push("/")}></i>
        <span>聊天页</span>
        <i className=" iconfont icon-gengduo" style={{ fontSize: 24, color: '#333', right: '20px', }} onClick={() => push("/groupInfo")}></i>
      </header>
      <main>
        聊天框
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
        <TextareaItem  rows={2} labelNumber={1} value={content} onChange={(value: any) => setContent(value)} />
        <div>
          <i onClick={()=>setEmojiModal(!showEmojiModal)} className="iconfont icon-expressions" style={{ fontSize: 30, marginRight: 10, marginLeft: 10 }}></i>
          <i className="iconfont icon-paper-full" style={{ fontSize: 30, color: '#16ac15' }}></i>
        </div>
      </footer>
    </div>
  )
}
export default inject('commonState', 'homeState')((observer(Home)));