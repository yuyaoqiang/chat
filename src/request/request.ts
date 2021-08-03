import axios from 'axios'
import { Toast } from 'antd-mobile';
import { Response } from './entity.d';
const baseURL: string = process.env.NODE_ENV === 'production' ? '' : '';
const timeout: number = 60000;

const reqeust = axios.create({
 timeout,
 transformRequest: [(data) => {
  if (typeof (data) === 'string') {
   return data
  }
  data = JSON.stringify(data)
  return data
 }],
 transformResponse: [(data) => {
  if (typeof data === 'string' && data.startsWith('{')) {
   data = JSON.parse(data)
  }
  return data
 }]
});

// 请求拦截器
reqeust.interceptors.request.use((config) => {
 const token: any = sessionStorage.getItem("user")
 const url = sessionStorage.getItem("text-url")
 const strToken = JSON.parse(token) || {}
 if (process.env.NODE_ENV === 'production') {
   //@ts-ignore
  config.url = url ? `${url}${baseURL}${config.url}` : `${ window.myConfig.domain}${config.url}`
 } else {
  config.url = `${baseURL}${config.url}`
 }
 config.headers.Authorization = strToken.Authorization;
 return config
}, (error) => {
 error.msg = '服务器异常，请联系管理员！'
 return Promise.resolve(error)
})

/**
 *响应拦截器
* 自定义状态处理
*/
reqeust.interceptors.response.use((response: Response) => {
 const { data,status } = response
 if (!data) {
  return data;
 }
 if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
  return JSON.parse(data);
 } else {
  return data
 }
}, (error) => {
 Toast.fail(`${error.response && error.response.data?error.response.data.message:'请求错误'}`)
 return Promise.reject(error.response)
})
export default reqeust;