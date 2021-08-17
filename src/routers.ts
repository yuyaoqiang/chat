import React from "react"
const Login = React.lazy(() => import('@pages/login'));
const Register = React.lazy(() => import('@pages/register'));
const Home = React.lazy(() => import('@pages/home'));
const Newsletter = React.lazy(() => import('@pages/newsletter'));
const My = React.lazy(() => import('@pages/my'));
const Block = React.lazy(() => import('@pages/block'));
const ChangePwd = React.lazy(() => import('@pages/changePwd'));
const Chat = React.lazy(() => import('@pages/chat'));
const FriendInfo = React.lazy(() => import('@pages/friendInfo'));
const SearchInfo = React.lazy(() => import('@pages/searchInfo'));
const GroupInfo = React.lazy(() => import('@pages/groupInfo'));
const CreateGroup = React.lazy(() => import('@pages/createGroup'));
const routeMap = [
  // 首页
  {
    path: "/",
    name: "home",
    component: Home,
    exact: true,
    auth: true,
  },
  // 通讯录
  {
    path: "/newsletter",
    name: "newsletter",
    component: Newsletter,
    auth: true,
  },
  // 我的
  {
    path: "/my",
    name: "my",
    component: My,
    auth: true,
  },
  // 黑名单
  {
    path: "/block",
    name: "block",
    component: Block,
    auth: true,
  },
  // 改变密码
  {
    path: "/changePwd",
    name: "changePwd",
    component: ChangePwd,
    auth: true,
  },
  // 聊天页
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    auth: true,
  },
  // 好友详情
  {
    path: "/friendInfo",
    name: "friendInfo",
    component: FriendInfo,
    auth: true,
  },
  // 好友详情
  {
    path: "/searchInfo",
    name: "searchInfo",
    component: SearchInfo,
    auth: true,
  },
  // 群详情
  {
    path: "/groupInfo",
    name: "groupInfo",
    component: GroupInfo,
    auth: true,
  },
  // 群详情
  {
    path: "/createGroup",
    name: "createGroup",
    component: CreateGroup,
    auth: true,
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login,
    auth: false,
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: Register,
    auth: false,
  },
]
export default routeMap
