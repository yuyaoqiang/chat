
import { WebsocketBuilder as WS, Websocket, WebsocketEvents } from 'websocket-ts';
import { publish } from "./publish"
let socket: Websocket
let pingTimer: any;
//初始化
const initWS = (token: string) => {
 open(token);
}

//心跳
const ping = () => {
 pingTimer = setTimeout(() => {
  clearTimeout(pingTimer);
  let pingStr = { "cmdKey": "PING" }
  send(pingStr)
  ping()
 }, 1000);
}
// 打开连接
const open = (token: string) => {
 socket = new WS(`ws://16.162.122.53:7777/chat/${token}`).build();
 msg()
 wsError()
 onClose();
 socket.addEventListener(WebsocketEvents.open, () => {
  console.log('建立连接')
  publish.publish('reconnect', {})
  ping();
 })
}

// 关闭连接
const close = () => {
 console.error('断开连接')
 socket.close()
}
// 发送
const send = (msg: any) => {
 if (!msg) return;
 const msgs = JSON.stringify(msg)
 socket.send(msgs)
}
// 关闭监听
const onClose = () => {
 socket.addEventListener(WebsocketEvents.close, () => {
  reconnect()
 })
}
// 重连
const reconnect = () => {
 let userStr = sessionStorage.getItem('user');
 if (!userStr) return;
 let user = JSON.parse(userStr)
 open(user.Authorization)
}

//接收 msg
const msg = () => {
 socket.addEventListener(WebsocketEvents.message, (event, msg) => {
  let data = JSON.parse(msg.data);
  let data2 = JSON.parse(msg.data);
  if (data.cmdKey === 'RECEIVE_CHAT_MSG') {
   // 消息页面
   publish.publish(data.cmdKey, data)
   // 聊天页面
   publish.publish('GET_CHAT_MSG', data2)
   // 系统消息
   if (data.senderHeadIcon === 'SYSTEM') {
    publish.publish('SYSTEM_MSG', data2)
   }
  }
 })
}
// 错误监听
const wsError = () => {
 socket.addEventListener(WebsocketEvents.error, (event) => {
  onClose()
 })
}
export {
 close,
 initWS,
 send
}