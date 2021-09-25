import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  './css/Style.css';
import { Provider } from 'react-redux';
import Store from "./redux/store/Store";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
      <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);
