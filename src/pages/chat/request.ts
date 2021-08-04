import { Data, Params } from 'src/request/entity.d';
import { get, put } from "src/request/api"

export const queryPagesByParams = (params: Params) => {
 const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
 return put('/api/v1/app/mine/query-trans-log-by-trans-reason', params, headers)
}
