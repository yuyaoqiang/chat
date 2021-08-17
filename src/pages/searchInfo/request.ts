import { Data, Params } from 'src/request/entity.d';
import { get, post, put } from "src/request/api"

export const addFriend = (data: any) => {
 return post('/api/v1/contact/friend/invitation', data)
}

export const editFriendRemark = (data: any) => {
 return put('/api/v1/contact/friend/remark', data)
}
