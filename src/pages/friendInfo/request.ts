import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const addFriend = (data: any) => {
 return post('/api/v1/contact/friend/invitation', data)
}
