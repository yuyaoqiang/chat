
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
 socket.addEventListener(WebsocketEvents.open, () => {
  console.log('建立连接')
  ping();
 })
}

// 关闭连接
const close = () => {
 socket.close()
}
// 发送
const send = (msg: any) => {
 if (!msg) return;
 const msgs = JSON.stringify(msg)
 socket.send(msgs)
}

//接收 msg
const msg = () => {
 socket.addEventListener(WebsocketEvents.message, (event, msg) => {
  let data = JSON.parse(msg.data);
  if (data.cmdKey === 'RECEIVE_CHAT_MSG') {
   // 消息页面
   publish.publish(data.cmdKey, data)
   // 聊天页面
   publish.publish('GET_CHAT_MSG', data)
  }
 })
}
// 错误
const wsError = () => {
 socket.addEventListener(WebsocketEvents.error, (event) => {
  console.error(event)
 })
}
export {
 close,
 initWS,
 send
}