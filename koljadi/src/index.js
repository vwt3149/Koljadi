import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth'; 
import koljadiReducer from './store/reducers/koljadi';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const rootReducer = combineReducers({
  auth :authReducer,
  koljadi: koljadiReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const logger = store => {
//   return next =>{
//     return action =>{
//       console.log('[Middleware] Dispatching', action);
//       const result = next(action);
//       console.log('[Middleware] next state', store.getState())
//       return result
//     }
//   }
// }

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
      <Provider store={store}>
          <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
      
   
    ,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
