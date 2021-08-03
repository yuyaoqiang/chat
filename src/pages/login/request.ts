import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const login = (data: Data) => {
 return post('/api/v1/app/login/login', data)
}