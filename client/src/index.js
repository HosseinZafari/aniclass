import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './component/Header'
import Footer from './component/Footer'
import {Router} from 'react-router-dom';
import progressBarCss from 'react-progress-bar-plus/lib/progress-bar.css';

// import 'bulma/css/bulma-rtl.min.css';
import "./css/Styles.css";
import LoadingContextProvider from "./context/LoadingContext";
import UserContextProvider from "./context/UserContext";
 


ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <LoadingContextProvider>
                <App/>
            </LoadingContextProvider>
        </UserContextProvider>
    </React.StrictMode>
    , document.getElementById('root')
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
