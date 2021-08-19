import React, { useEffect, Suspense } from 'react';
import { Switch, } from "react-router-dom"
import { observer, inject } from "mobx-react";
import AuthRoute from "./utils/authRoute"
import { close, send } from "@utils/webSocket"
import './App.scss';
import { Toast } from 'antd-mobile';
Toast.config({ duration: 1.3 })
const App = (props: any) => {
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