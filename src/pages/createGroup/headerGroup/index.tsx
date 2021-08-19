import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useServiceHooks from "@hooks/useServiceHooks"
import { List, Switch, Modal, Toast } from "antd-mobile";
import "./style.scss"
const prompt = Modal.prompt;
const HeaderGroup = (props: any) => {
  const [checked, setChecked] = useState(false)
  const { groupInfo, setGroupInfo, setVisible } = props;
  return (
    <div className="header-group-wrap">
      <ul className="container">
        <li className="picture" onClick={() => setVisible(true)}>
          {
            groupInfo.groupHeadIcon
              ? <img src={groupInfo.groupHeadIcon} />
              :
              <i className="iconfont icon-shangchuan" style={{ fontSize: 44, color: '#aeaeae' }}></i>
          }
        </li>
        <li className="title">
          <p className="create-group-title">{groupInfo.groupNickName ? groupInfo.groupNickName : '请编辑名称'} </p>
          <span>{groupInfo.userCode.length}位成员</span>
        </li>
        <li className="icon_edit_wrap">
          <i
            className="iconfont icon-icon-"
            onClick={() => prompt('群名', '请输入群名',
              [
                {
                  text: '取消',
                  onPress: value => { }
                },
                {
                  text: '确定',
                  onPress: value => { setGroupInfo({ ...groupInfo, groupNickName: value }) },
                },
              ], 'default', undefined, ['请输入群名'])}></i>
        </li>
      </ul>
      {/* <List className="my-list">
        <List.Item extra={<Switch checked={false} onChange={() => false} />}>
          通知
          <List.Item.Brief>开启</List.Item.Brief>
        </List.Item>
      </List> */}
    </div >
  )
}
export default HeaderGroup;