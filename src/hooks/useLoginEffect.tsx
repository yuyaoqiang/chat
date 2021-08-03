import React, { useState, useEffect } from "react";

const useLoginEffect = () => {
 const [isLogin, setIsLogin] = useState(false);

 useEffect(() => {
  if (isLogin) {
   return
  }
  setTimeout(() => {
   setIsLogin(true)
  }, 1000);
 }, [])

 return { isLogin };
}
export default useLoginEffect;