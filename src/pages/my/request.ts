import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const mine = (params: Params) => {
 return get('/api/v1/user/mine', params)
}