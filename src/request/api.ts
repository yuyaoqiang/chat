import axios from "axios"
import api from "./request"

import { Params, Data } from "./entity"
export const get = (url: string, params: Params) => {
 return api({
  url,
  method: 'get',
  params,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
 })
}

export const post = (url: string, data: Data | string, headers?: any) => {
 return api({
  url,
  method: 'post',
  data,
  headers: headers ? headers : { 'Content-Type': 'application/json;charset=utf-8' }
 })
}

export const put = (url: string, params: Data | string, headers?: any) => {
 return api({
  url,
  method: 'put',
  params,
  headers: headers ? headers : { 'Content-Type': 'application/json;charset=utf-8' }
 })
}

export const upload = (url: string, data: Data, params: any) => {
 const baseURL: string = process.env.NODE_ENV === 'production' ? '' : '';
 const token: any = sessionStorage.getItem("user")
 const strToken = JSON.parse(token) || {}
 const textUrl = sessionStorage.getItem("text-url")
 const hostname = window.location.hostname;
 if (process.env.NODE_ENV === 'production') {
  // url = textUrl ? `${textUrl}${url}` : `https://api.rgroiho.cn${url}`
  // @ts-ignore
  url = textUrl ? `${textUrl}${url}` : `${ window.myConfig.domain}${url}`
 }
 return axios.post(baseURL + url, data, {
  headers: { 'Content-Type': 'multipart/form-data', Authorization: strToken.Authorization, ...params },
 })
}