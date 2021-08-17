import { Data, Params } from 'src/request/entity.d';
import { get, put } from "src/request/api"

export const mine = (params: Params) => {
 return get('/api/v1/user/mine', params)
}
export const setInfo = (data: any) => {
 return put('/api/v1/user/info', data)
}