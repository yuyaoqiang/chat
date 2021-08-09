import { Data } from 'src/request/entity.d';
import { post, get } from "src/request/api"
export const save = (data: Data) => {
 return post('/api/v1/user/user/register', data)
}
export const randomCode = (data: Data) => {
 return get('/api/v1/user/random-user-code', data)
}