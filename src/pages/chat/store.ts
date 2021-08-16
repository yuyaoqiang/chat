import { observable, action, makeObservable } from "mobx";
import { subscriber } from "@utils/publish"
class ChatState {
 constructor() {
  makeObservable(this)
  subscriber('GET_CHAT_MSG', this.setMsg)
 }
 @observable chatsData: any[] = [];
 @observable chatUser: any = {}
 // 设置来信
 @action
 setMsg = (msg: any) => {
  if (!this.chatUser.senderCode) return;
  if (this.chatUser.senderCode === msg.senderCode) {
   this.chatsData = [...this.chatsData, msg]
  }
 }
 // 设置发送信息
 sendMsg = (msg: any) => {
  this.chatsData = [...this.chatsData, msg]
 }
 // 设置历史记录
 @action
 setHistory = (list: any) => {
  this.chatsData = [...list, ...this.chatsData]
 }
 // 设置Msg接收人
 @action
 setChatUser = (user: any) => {
  this.chatUser = user;
 }
 // 清空所有消息
 @action
 clearMsg = () => {
  this.chatsData = []
 }
}
export default ChatState;