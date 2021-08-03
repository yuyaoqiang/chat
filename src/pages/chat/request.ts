import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const myStatus = (params: Params) => {
 return get('/api/v1/app/sale/my-status', params)
}
export const add = (data: Data) => {
 return post('/api/data/a', data)
}