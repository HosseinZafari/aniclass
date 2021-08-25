import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  './css/Style.css';
import { Provider } from 'react-redux';
import Store from "./redux/store/Store";

ReactDOM.render(
    <React.StrictMode>
      <Provider store={Store}>
            <App />
      </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);