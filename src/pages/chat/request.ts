import { Data, Params } from 'src/request/entity.d';
import { get, put } from "src/request/api"

export const queryPagesByParams = (params: Params) => {
 return get('/api/v1/chat/history', params)
}
