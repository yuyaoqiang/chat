import React, { useState } from "react";
import { Toast } from "antd-mobile"
import { useHistory } from "react-router-dom";
import HeaderBar from "@components/header"
import { observer, inject } from "mobx-react"
import { login } from "./request"
import "./style.scss"
const Login = (props: any) => {
  const { push } = useHistory();
  const { userState } = props;
  const history = useHistory();
  const [loginName, setLoginName] = useState<string>()
  const [password, setPassword] = useState<string>()
  let { updateUser } = userState as any;
  const loginSubmit = () => {
    if (!loginName || !password) {
      Toast.fail("请输入账号或密码", 1.5);
      return
    }
    Toast.loading('Loading...', 0)
    login({ code: loginName, pwd: password }).then((res: any) => {
      updateUser({ Authorization: res, isLogin: true });
      Toast.success("欢迎您的到来！");
      history.replace("/")
    })
  }
  return (
    <div className="login-wrap">
      <h3 className="login-title">贵圈登陆</h3>
      <div className="login-inputs">
        <p className="inputs">
          <input type="text" placeholder="请输入账号" onChange={(e) => setLoginName(e.target.value)} />
        </p>
        <p className="inputs">
          <input type="password" placeholder="请输入密码" onChange={(e) => setPassword(e.target.value)} />
        </p>
      </div>
      <footer className="login-footer">
        <button className="greenBg" onClick={() => loginSubmit()}>登陆</button>
        <button className="greenColor" onClick={() => { push("/register") }}>注册</button>
      </footer>
    </div>
  )
}
export default inject('userState', 'homeState')((observer(Login)));
