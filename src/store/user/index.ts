import { observable, computed, action, makeObservable, autorun } from "mobx";
import { initWS } from "@utils/webSocket"
class UserState {
  constructor() {
    makeObservable(this)
    autorun(() => {
      const userStr = sessionStorage.getItem('user');
      if (userStr) {
        this.updateUser(JSON.parse(userStr));
      }
    })
  }

  @observable user: any = {
    Authorization: "",
    isLogin: false,

  }

  @action logout = () => {
    this.user.isLogin = false;
    sessionStorage.clear();
  }

  //登录成功后更新用户
  @action updateUser = (user: any) => {
    this.user = user
    initWS(this.user.Authorization)
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  @computed get msg() {
    return `${this.user.mobilePhone}`
  }
}
export default UserState;