import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderBar from "@components/header"
import { changePwd } from "./request"
import { Toast } from "antd-mobile";
import { observer, inject } from "mobx-react"
import "./style.scss"
const Register = (props: any) => {
  const { replace } = useHistory();
  const [registerInfo, setRegisterInfo] = useState<any>({})
  // 注册跳转
  const back = () => {
    replace("/my")
  }

  const change = (e: any, key: string) => {
    setRegisterInfo({ ...registerInfo, [key]: e.target.value })
  }
  const register = () => {
    const { oldPwd, entryPwd, pwd } = registerInfo;
    if (!oldPwd || !entryPwd || !pwd) {
      Toast.fail("填写信息不能为空 ", 1.5);
      return
    }
    if (oldPwd.length < 6) {
      Toast.fail("6-18位大小写字母+数字组合", 1.5);
      return;
    }
    if (pwd !== entryPwd) {
      Toast.fail("确认密码不一致", 1.5);
      return
    }
    Toast.loading('Loading...');
    changePwd({ oldPwd, newPwd: registerInfo.entryPwd }).then((res: any) => {
      Toast.success("修改密码成功!");
      back();
    })
  }
  return <div className="register">
    <HeaderBar goback={back} title={"修改密码"} />
    <div className="main">
      <p className="inputs">
        <span>原密码</span>
        <input type="password" onChange={(e) => { change(e, "oldPwd") }} placeholder="请输入原密码" />
      </p>
      <p className="inputs">
        <span>新密码</span>
        <input type="password" onChange={(e) => { change(e, "pwd") }} placeholder="6-18位大小写字母+数字组合" />
      </p>
      <p className="inputs">
        <span>确认新密码</span>
        <input type="password" onChange={(e) => { change(e, "entryPwd") }} placeholder="确认密码" />
      </p>
      <button className="register-btn" onClick={register}>确定</button>
    </div>
  </div>
}
export default Register