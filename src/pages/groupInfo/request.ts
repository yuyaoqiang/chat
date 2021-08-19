import { Data, Params } from 'src/request/entity.d';
import { get, post, put } from "src/request/api"

export const getGroupInfo = (params: Params) => {
 return get('/api/v1/group/info', params)
}
export const setAdmin = (data: any) => {
 return post('/api/v1/group/admin', data)
}
export const transferOwner = (data: any) => {
 return post('/api/v1/group/transfer-owner', data)
}
export const forbidden = (data: any) => {
 return post('/api/v1/group/forbidden', data)
}
export const kickOff = (data: any) => {
 return post('/api/v1/group/kick-off', data)
}
export const dismiss = (data: any) => {
 return put('/api/v1/group/dismiss', data)
}