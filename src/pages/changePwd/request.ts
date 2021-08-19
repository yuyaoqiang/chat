import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const changePwd = (data: Data) => {
 return post('/api/v1/user/user/change-pwd', data)
}

export const save = (data: Data) => {
 return post('/api/v1/app/login/register', data)
}