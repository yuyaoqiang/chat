import React, { useEffect,Suspense } from 'react';
import { Switch, } from "react-router-dom"
import { observer, inject } from "mobx-react";
import AuthRoute from "./utils/authRoute"
import './App.scss';
import { Toast } from 'antd-mobile';
import { transferArrayToObj } from '@utils/helpers';
Toast.config({ duration: 1.3 })
const id = 0;
const App = (props: any) => {
 
  
  const displayStatus=()=>{
    return <p className="status-icon"></p>
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <AuthRoute></AuthRoute>
        </Switch>
      </Suspense>
    </>
  )
}

export default inject('commonState')((observer(App)));