import { observable, action, makeObservable } from "mobx";
class MyState {
 constructor() {
  makeObservable(this)
 }

}
export default MyState;