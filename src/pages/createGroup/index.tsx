import React, { useState } from "react";
import HeaderGroup from ".//headerGroup"
import Avatar from "@components/avatar"
import { observer, inject } from "mobx-react"
import { useHistory } from "react-router-dom";
import { Checkbox, Toast } from "antd-mobile";
import { create } from "./request";
import { setInfo } from "@pages/my/request"
import { avatars, avatarsMap, gpAvatars } from "@utils/avatarData";
import './style.scss'
const Home = (props: any) => {
    const { push, goBack } = useHistory();
    const { newsletterState } = props;
    const [visible, setVisible] = useState(false)
    const { initFriends, onlyFriends } = newsletterState;
    const [groupInfo, setGroupInfo] = useState<any>({ groupNickName: '', userCode: [], groupHeadIcon: "", notice: false })
    const checkedFriends = (code: any) => {
        const { userCode } = groupInfo
        const index = userCode.indexOf(code)
        if (index !== -1) {
            userCode.splice(index, 1)
        } else {
            userCode.push(code)
        }
        setGroupInfo({ ...groupInfo, userCode })
    }
    const createGroup = () => {
        if (!groupInfo.groupNickName) {
            Toast.fail('请填写群名称')
            return;
        }
        if (groupInfo.groupNickName.length > 15) {
            Toast.fail('群名称最多15位')
            return;
        }
        if (groupInfo.userCode.length < 1) {
            Toast.fail('创建群最少需要2位成员')
            return;
        }
        create(groupInfo).then(res => {
            Toast.success('创建成功');
            initFriends();
            push("/newsletter")
        })
    }
    return (
        <div className="create-group-wrap">
            <header>
                <i className=" iconfont icon-fanhui goback" style={{ fontSize: 24, color: '#333' }} onClick={() => goBack()}></i>
                <span>创建群组</span>
            </header>
            < HeaderGroup
                groupInfo={groupInfo}
                setGroupInfo={setGroupInfo}
                setVisible={setVisible}
            />
            <ul className="chats-wrap">
                {
                    onlyFriends.map((item: any) => {
                        return (
                            <div key={item.initial}>
                                <p className="sort-word">{item.initial}</p>
                                {
                                    item.data.map((user: any) => {
                                        return (
                                            <Checkbox.CheckboxItem key={user.partnerCode} checked={groupInfo.userCode.includes(user.partnerCode)} onClick={() => checkedFriends(user.partnerCode)}>
                                                <li className="chat-item" key={user.partnerCode} >
                                                    <p className="chat-item-left">
                                                        <img src={avatarsMap[user.headIcon]} alt="" />
                                                    </p>
                                                    <div className="chat-item-right">
                                                        <p className="chat-name-date">
                                                            <span>{user.nickName}</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            </Checkbox.CheckboxItem>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </ul>
            {visible && <Avatar
                imgData={gpAvatars} visible={visible}
                setVisible={setVisible}
                submit={(icon: string) => {
                    setGroupInfo({ ...groupInfo, groupHeadIcon: icon })
                    setVisible(false)
                }} />}
            <div className="group-chat-submit">
                <span onClick={createGroup}><i className="iconfont icon-liaotian" style={{ fontSize: 24, color: '#fff' }}></i>创建群</span>
            </div>
        </div>
    )
}
export default inject('homeState', 'newsletterState')((observer(Home)));