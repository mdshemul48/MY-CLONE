import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import store from "./Store/index"
import App from './App';


import "./Index.css"
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

