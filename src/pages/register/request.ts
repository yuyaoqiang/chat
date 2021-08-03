import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const sendSms = (data: Data) => {
 return post('/index/redlists/smsinfo/sendSms', data)
}

export const save = (data: Data) => {
 return post('/api/v1/app/login/register', data)
}