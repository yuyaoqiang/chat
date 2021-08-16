import { observable, action, makeObservable } from "mobx";
import { pySegSort } from "@entity/PinYin"
import { relations } from "./request";
class NewsletterState {
 constructor() {
  makeObservable(this)
  this.initFriends()
 }
 @observable friends = [];
 @observable friendsSorted = [];
 @action
 cacheFriends = (friends: any) => {
  this.friends = friends
  this.friendsSortByName(friends)
 }
 @action
 friendsSortByName = (friends: any) => {
  this.friendsSorted = pySegSort(friends)
 }

 // 好友群列表
 @action
 initFriends = () => {
  relations({}).then((res: any) => {
   this.cacheFriends(res)
  })
 }
}
export default NewsletterState;