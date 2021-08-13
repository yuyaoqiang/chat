import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useServiceHooks from "@hooks/useServiceHooks"
import { List, Switch } from "antd-mobile";
import "./style.scss"
// const [checked, setChecked] = useState(false)
export type HeaderGroupProps = {
  picture: string,
  title: string,
  memberInfo: object | {
    members: '',
    online: ''
  },
  id: string | number,
  remark: string
}
const HeaderGroup = (props: HeaderGroupProps) => {
  const { picture, title, memberInfo, id,  remark} = props;
  console.log(memberInfo)
  return (
    <div className="header-wrap">
      <ul className="container">
        <li className= "picture">
          <img src={picture} alt="" />
        </li>
        <li className="title">
          <p>{title} </p>
          {/* <span>`${memberInfo.members}位成员、${memberInfo.online}位在线`</span> */}
        </li>
        <li className="icon_edit_wrap"><i className="iconfont icon-jiahao"></i></li>
      </ul>
      <List className="my-list">
        <List.Item extra={ <i className="iconfont icon-jiahao"></i>}>
          信息
          <List.Item.Brief>12312312312</List.Item.Brief>
          <List.Item.Brief>邀请链接</List.Item.Brief>
        </List.Item>
        <List.Item extra={<Switch checked={false} onChange={() => false} />}>
          通知
          <List.Item.Brief>开启</List.Item.Brief>
        </List.Item>
      </List>
    </div>
  )
}
export default HeaderGroup;