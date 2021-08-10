import { observable, action, makeObservable } from "mobx";
class NewsletterState {
 constructor() {
  makeObservable(this)
 }
 @observable friends = [];

 @action
 cacheFriends = (friends: any) => {
  this.friends = friends
 }
}
export default NewsletterState;