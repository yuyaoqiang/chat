import { observable, action, makeObservable, autorun } from "mobx";
import { subscriber } from "@utils/publish"
class HomeState {
 constructor() {
  makeObservable(this)
  autorun(() => {
   this.getChatListByLocal()
   subscriber('RECEIVE_CHAT_MSG', this.setUnreadList)
  })
 }

 // 未读
 @observable unreadList: any = [];

 // 总未读数
 @observable unreadCount = 0

 // 当前聊天框角色
 @observable userAtChat: any = ""

 // 设置对话列表未读
 @action
 setUnreadList = (msg: any) => {
  if (msg.msgType === 'USER') {
   if (msg.oriToChatUserType === 'GROUP') {
    let index = this.unreadList.findIndex((item: any) => item.oriToChatUserCode == msg.oriToChatUserCode)
    if (index !== -1) {
     if (this.userAtChat === msg.oriToChatUserCode) {
      this.unreadList[index] = { ...msg, unreadCount: 0 }
      this.countReadHandle()
      this.setChatListByLocal(this.unreadList)
      return;
     }
     let count = this.unreadList[index].unreadCount;
     this.unreadList[index] = { ...msg, unreadCount: count + 1 }
     this.countReadHandle()
     this.setChatListByLocal(this.unreadList)
     return;
    } else {
     if (this.userAtChat === msg.oriToChatUserCode) {
      this.unreadList = [{ ...msg, unreadCount: 0 }, ...this.unreadList]
      this.countReadHandle()
      this.setChatListByLocal(this.unreadList)
      return;
     }
     this.unreadList = [{ ...msg, unreadCount: 1 }, ...this.unreadList]
     this.countReadHandle()
     this.setChatListByLocal(this.unreadList)
    }
   }
   if (msg.oriToChatUserType === 'USER') {
    let index = 0;
    let loginUserStr = sessionStorage.getItem('user') || ''
    let loginUser = JSON.parse(loginUserStr)
    if (loginUser.code === msg.senderCode) {
     let copyMsg = Object.assign({}, msg)
     msg.senderCode = copyMsg.oriToChatUserCode;
     msg.oriToChatUserCode = copyMsg.senderCode;
     msg.oriToChatUserNickName = copyMsg.senderNickName;
     msg.senderNickName = copyMsg.oriToChatUserNickName;
     index = this.unreadList.findIndex((item: any) => item.senderCode === msg.senderCode)
    } else {
     index = this.unreadList.findIndex((item: any) => item.oriToChatUserCode == msg.oriToChatUserCode)
    }
    if (index !== -1) {
     if (this.userAtChat === msg.senderCode) {
      this.unreadList[index] = { ...msg, unreadCount: 0 }
      this.countReadHandle()
      this.setChatListByLocal(this.unreadList)
      return;
     }
     let count = this.unreadList[index].unreadCount;
     this.unreadList[index] = { ...msg, unreadCount: count + 1 }
     this.countReadHandle()
     this.setChatListByLocal(this.unreadList)
    } else {
     if (this.userAtChat === msg.senderCode) {
      this.unreadList = [{ ...msg, unreadCount: 0 }, ...this.unreadList]
      this.countReadHandle()
      this.setChatListByLocal(this.unreadList)
      return;
     }
     this.unreadList = [{ ...msg, unreadCount: 1 }, ...this.unreadList]
     this.countReadHandle()
     this.setChatListByLocal(this.unreadList)
    }
   }
  }
 }
 @action
 delMsgByCode = (item: any) => {
  if (item.oriToChatUserType === "GROUP") {
   let latests = this.unreadList.filter((l: any) => l.oriToChatUserCode !== item.oriToChatUserCode);
   this.unreadList = latests;
  } else {
   let latests = this.unreadList.filter((l: any) => l.senderCode !== item.senderCode);
   this.unreadList = latests;
  }
  this.countReadHandle()
  this.setChatListByLocal(this.unreadList)
 }

 // 清理某个对话记录
 @action
 clearUnreadBySomeUser = (user: any) => {
  if (user.oriToChatUserType === "GROUP") {
   let index = this.unreadList.findIndex((item: any) => item.oriToChatUserCode === user.oriToChatUserCode)
   this.unreadList[index].unreadCount = 0;
  } else {
   let index = this.unreadList.findIndex((item: any) => item.senderCode == user.senderCode)
   this.unreadList[index].unreadCount = 0;
  }
  this.setChatListByLocal(this.unreadList)
  this.countReadHandle()
 }
 @action
 initHistoryAndListener = () => {
  this.getChatListByLocal()
  subscriber('RECEIVE_CHAT_MSG', this.setUnreadList)
 }
 @action
 setCurrentUser = (userAtChat: any) => {
  this.userAtChat = userAtChat;

 }
 // 统计所有记录数量
 countReadHandle = () => {
  let count = 0;
  this.unreadList.map((item: any) => count = count + item.unreadCount)
  this.unreadCount = count;
 }
 // 本地获取聊天记录
 @action
 getChatListByLocal = () => {
  let loginUserStr = sessionStorage.getItem('user') || ''
  if (!loginUserStr) return;
  let loginUser = JSON.parse(loginUserStr)
  let chatsStr = localStorage.getItem(loginUser.code + 'chats')
  if (chatsStr) {
   let chats = JSON.parse(chatsStr)
   this.unreadList = chats;
  } else {
   this.unreadList = []
  }
 }
 // 本地设置聊天记录
 @action
 setChatListByLocal = (unreadList: any[]) => {
  let loginUserStr = sessionStorage.getItem('user') || ''
  let loginUser = JSON.parse(loginUserStr)
  let chatsStr = JSON.stringify(unreadList)
  localStorage.setItem(loginUser.code + 'chats', chatsStr)
 }
}
export default HomeState;