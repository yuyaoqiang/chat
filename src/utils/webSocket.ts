
import { WebsocketBuilder as WS, Websocket, WebsocketEvents } from 'websocket-ts';
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
  send(JSON.stringify(pingStr))
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
const send = (msg: string) => {
 socket.send(msg)
}

//接收 msg
const msg = () => {
 socket.addEventListener(WebsocketEvents.message, (event, msg) => {
  console.log(msg.data)
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