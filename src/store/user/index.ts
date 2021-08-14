import { observable, computed, action, makeObservable, autorun } from "mobx";
import { initWS } from "@utils/webSocket"
import { mine } from "@pages/my/request"
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
  @observable userInfo = {};

  @action
  setUserInfo = () => {
    mine({}).then(res => {
      this.userInfo = res;
    })

  }

  @action logout = () => {
    this.user.isLogin = false;
    sessionStorage.clear();
  }

  //登录成功后更新用户
  @action updateUser = (user: any) => {
    this.user = user
    this.setUserInfo()
    initWS(this.user.Authorization)
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  @computed get msg() {
    return `${this.user.mobilePhone}`
  }
}
export default UserState;