import { Data, Params } from 'src/request/entity.d';
import { get, put } from "src/request/api"

export const getGroupInfo = (params: Params) => {
 return get('/api/v1/group/info', params)
}

export const invitation = (data: any) => {
 return put('/api/v1/group/join/by-invitation-link', data)
}