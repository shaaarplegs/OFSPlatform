import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './customStyle/pricingEstimator.css';
import './customStyle/FreelancingServices.css';
import './customStyle/Home.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './customStyle/logo.css'
import {store} from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
// require('dotenv').config();
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
               <App />
        </BrowserRouter>
        </PersistGate>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
