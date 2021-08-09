import { observable, action, makeObservable } from "mobx";
class FriendState {
 constructor() {
  makeObservable(this)
 }
 @observable friends = [];

 @action
 cacheFriends = (friends: any) => {
  this.friends = friends
 }
}
export default FriendState;