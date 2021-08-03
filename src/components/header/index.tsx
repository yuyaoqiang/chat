import React from "react";
import { useHistory } from "react-router-dom";
import useServiceHooks from "@hooks/useServiceHooks"
import "./style.scss"
export type HeaderBarProps = {
  goback: string | (() => void),
  title: string,
  rightTitle?: string
  cb?: Function
}
const HeaderBar = (props: HeaderBarProps) => {
  let history = useHistory();
  let { onService } = useServiceHooks();
  const { goback, title, rightTitle, cb } = props;
  const to = () => {
    if (typeof goback === 'function') {
      goback()
    } else {
      history.replace(goback)
    }
  }
  return (
    <header className="header-wrap">
      <ul className="container">
        <li className=" iconfont icon-fanhui" style={{color:'#333',fontSize:24}} onClick={to}></li>
        <li className="title">{title}</li>
        <li className="title small-title" onClick={() => { cb && cb() }}>{rightTitle}</li>
      </ul>
    </header>
  )
}
export default HeaderBar;