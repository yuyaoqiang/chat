import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router} from "react-router-dom"
import App from "./App"
import { Provider } from 'mobx-react';
import Store from './store';
import 'lib-flexible';
import FastClick from 'fastclick';
import './index.scss';
FastClick.attach(document.body)
ReactDOM.render(
  <Provider {...Store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));