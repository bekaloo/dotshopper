import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history = createBrowserHistory();
const Crouter = (stater: {}) => {
const [pathState, setPathState] = useState({
action: history.action,
location: history.location
})
const [state, setState] = useState({})
useLayoutEffect(()=>history.listen(setPathState,))
  return (
    <Router
    navigator={history}  navigationType={pathState.action} location={pathState.location} >        
  <App />
  </Router>
  )
}


root.render(
  <React.StrictMode>
     <Crouter/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
