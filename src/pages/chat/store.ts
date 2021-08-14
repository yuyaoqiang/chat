import { observable, action, makeObservable } from "mobx";
import { subscriber } from "@utils/publish"
class HomeState {
 constructor() {
  makeObservable(this)
  subscriber('GET_CHAT_MSG', this.setMsg)
 }
 @observable data: any[] = [];

 // 设置来信
 @action
 setMsg = (msg: any) => {
  this.data = [...this.data, msg]
 }

 // 设置历史记录
 @action
 setHistory = (list: any) => {
  this.data = [...list, ...this.data]
 }

 // 清空所有消息
 @action
 clearMsg = () => {
  this.data = []
 }
}
export default HomeState;