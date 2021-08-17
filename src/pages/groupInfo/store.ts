import { observable, action, makeObservable } from "mobx";
class GroupInfo {
 constructor() {
  makeObservable(this)
 }
 @observable data = {};
}
export default GroupInfo;