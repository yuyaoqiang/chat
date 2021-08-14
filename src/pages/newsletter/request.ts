import { Data, Params } from 'src/request/entity.d';
import { get, post, put } from "src/request/api"

export const relations = (params: any) => {
 return get('/api/v1/contact/friend/relation', params)
}
export const searchChatUser = (params: any) => {
 return get('/api/v1/contact/chat-user', params)
}
export const invitation = (params: any) => {
 return get('/api/v1/contact/friend/invitation', params)
}
export const invitationHandleWay = (data: any) => {
 return put('/api/v1/contact/friend/invitation', data)
}
export const add = (data: Data) => {
 return post('/api/data/a', data)
}