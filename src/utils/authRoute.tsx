import React from "react"
import { Toast } from "antd-mobile";
import { observer, inject } from "mobx-react"
import { Route, Redirect, useLocation } from "react-router-dom"
import routers from "../routers"
const AuthRoute = (props: any) => {
 const { pathname } = useLocation();
 const { userState } = props;
 let { user } = userState;
 const targetRouteObj: any = routers.find((item) =>{
  console.log(item.path)
  return item.path === pathname
 })

 let { component } = targetRouteObj
 // 不需要拦截的页面直接放行
 if (targetRouteObj && !targetRouteObj.auth && !user.isLogin) {
  return <Route path={pathname} component={component}></Route>
 }
 if (user.isLogin) { // 登录
  if (pathname === "/login") {
   return <Redirect to="/"></Redirect>
  } else {
   return <Route path={pathname} component={component}></Route>
  }
 } else { // 未登录
  if (targetRouteObj && targetRouteObj.auth) {
   Toast.info("请先登录", 1.3)
   return <Redirect to="/login" />
  } else {
   return <Redirect to="/404" />
  }
 }
}
export default inject('userState')((observer(AuthRoute)));