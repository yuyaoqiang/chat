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
    mine({}).then((res: any) => {
      this.user = { ...this.user, ...res };
      sessionStorage.setItem('user', JSON.stringify(this.user))
    })
  }

  @action logout = () => {
    this.user.isLogin = false;
    sessionStorage.clear();
  }

  //登录成功后更新用户
  @action updateUser = (user: any) => {
    this.user = user
    initWS(this.user.Authorization)
    this.setUserInfo()
  }
  @computed get msg() {
    return `${this.user.mobilePhone}`
  }
}
export default UserState;