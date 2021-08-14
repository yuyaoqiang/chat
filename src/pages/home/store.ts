import { observable, action, makeObservable } from "mobx";
import { subscriber } from "@utils/publish"
class HomeState {
 constructor() {
  makeObservable(this)
  subscriber('RECEIVE_CHAT_MSG', this.setUnreadList)
 }

 // 未读
 @observable unreadList: any = [];

 // 总未读数
 @observable unreadCount = 0

 // 当前聊天框角色
 @observable userAtChat: any = ""

 @action
 setUnreadList = (msg: any) => {
  let index = this.unreadList.findIndex((item: any) => item.senderUserCode == msg.senderUserCode)
  if (index !== -1) {
   let count = this.unreadList[index].unreadCount;
   this.unreadList[index] = { ...msg, unreadCount: count + 1 }
  } else {
   this.unreadList = [{ ...msg, unreadCount: 1 }, ...this.unreadList]
  }
  this.countReadHandle()
 }
 countReadHandle = () => {
  let count = 0;
  this.unreadList.map((item: any) => count = count + item.unreadCount)
  this.unreadCount = count;
 }
}
export default HomeState;