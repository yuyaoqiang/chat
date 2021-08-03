import React, { useEffect, useRef } from "react";
import { observer, inject } from "mobx-react"
import { useHistory, useLocation } from "react-router-dom";
import { Badge } from "antd-mobile";
import { config } from "./config"
import "./style.scss"
const NavBar = (props: any) => {
  let history = useHistory();
  let location = useLocation();
  const ref = useRef(null);
  const { commonState } = props;
  const to = (path: string) => {
    history.replace(path)
  }
  useEffect(() => {
    const curretn: any = ref.current;
    if (curretn) {
      commonState.updateFooterHeight(curretn.clientHeight);
    }
  }, [])
  return (
    <ul className="navBar" ref={ref}>
      {
        config.map((item, index) => {
          return <li onClick={() => to(item.path)} key={item.name} className={item.path === location.pathname ? 'activity' : ''}>
            <i className={`icons ${item.icon} iconfont`} style={{fontSize:24}} />
            <span className={item.path === location.pathname ? 'activity-font' : ''}>{item.name}</span>
            {item.path==='/' && <Badge text={77} overflowCount={55} className="badge-my"/>}
          </li>
        })
      }
    </ul>
  )
}
export default inject('commonState')((observer(NavBar)));