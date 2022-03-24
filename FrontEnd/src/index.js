import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { rootReducer } from './reducers'
import '@fortawesome/fontawesome-free/css/all.min.css';
import thunkMiddleware from 'redux-thunk';

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initState = { cart: { items: cartItems } };
const myStore = createStore(
  rootReducer,initState, applyMiddleware(thunkMiddleware)
);


ReactDOM.render(
  <Provider store={myStore}>
        < App / > 
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
