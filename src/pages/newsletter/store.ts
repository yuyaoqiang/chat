import { observable, action, makeObservable, autorun } from "mobx";
import { pySegSort } from "@entity/PinYin"
import { relations } from "./request";
class NewsletterState {
 constructor() {
  makeObservable(this)
  autorun(() => {
   let userStr = sessionStorage.getItem('user') || ''
   if (userStr.length > 0) {
    this.initFriends()
   }
  })
 }
 @observable friends = [];
 @observable onlyFriends = [];
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

 @action
 onlyFriendsSorted = (friends: any) => {
  let filterFriends = friends.filter((friend: any) => friend.userType !== 'GROUP')
  let friendsSorted = pySegSort(filterFriends)
  this.onlyFriends = friendsSorted
 }
 // 好友群列表
 @action
 initFriends = () => {
  relations({}).then((res: any) => {
   this.cacheFriends(res)
   this.onlyFriendsSorted(res)
  })
 }
}
export default NewsletterState;