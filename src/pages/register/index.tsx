import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderBar from "@components/header"
import { save, randomCode } from "./request"
import { Toast } from "antd-mobile";
import "./style.scss"
const Register = (props: any) => {
  const { replace } = useHistory();
  const [code, setCode] = useState('')
  const [registerInfo, setRegisterInfo] = useState<any>({})
  // 注册跳转
  const back = () => {
    replace("/login")
  }

  const change = (e: any, key: string) => {
    setRegisterInfo({ ...registerInfo, [key]: e.target.value })
  }
  const randomCodeHandle = () => {
    randomCode({}).then((res: any) => {
      setCode(res)
    })
  }
  const register = () => {
    const { entryPwd, pwd } = registerInfo;
    if (!code || !entryPwd || !pwd) {
      Toast.fail("填写信息不能为空 ", 1.5);
      return
    }
    if (code.length < 5) {
      Toast.fail("5-11位大小写英文字母或数字", 1.5);
      return;
    }
    if (pwd !== entryPwd) {
      Toast.fail("确认密码不一致", 1.5);
      return
    }
    Toast.loading('Loading...');
    save({ code,...registerInfo }).then((res: any) => {
      Toast.success("注册成功!");
      back();
    })
  }
  useEffect(() => {
    randomCodeHandle()
  }, [])
  return <div className="register">
    <HeaderBar goback={back} title={"注册"} />
    <div className="main">
      <p className="inputs">
        <span>登陆账号</span>
        <input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}}  placeholder="5-11位大小写英文字母或数字" />
      </p>
      <p className="inputs">
        <span>登录密码</span>
        <input type="password" onChange={(e) => { change(e, "pwd") }} placeholder="6-18位大小写字母+数字组合" />
      </p>
      <p className="inputs">
        <span>确认密码</span>
        <input type="password" onChange={(e) => { change(e, "entryPwd") }} placeholder="确认密码" />
      </p>
      <button className="register-btn" onClick={register}>注册</button>
    </div>
  </div>
}
export default Register