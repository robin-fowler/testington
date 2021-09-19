
import React from 'react';
import ReactDOM from 'react-dom';

// firebase imports
import { initializeApp } from 'firebase/app';

import { Provider } from 'react-redux';
import { store } from './rootReducer';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDMSzDWBYYSpye0gKZDwSVepkEcg7muGAQ",
  authDomain: "slyck-ffeb6.web.app",
  databaseURL: "https://slyck-ffeb6.firebaseio.com",
  projectId: "slyck-ffeb6",
  storageBucket: "slyck-ffeb6.appspot.com",
  messagingSenderId: "768159297860",
  appId: "1:768159297860:web:32c8da5f92e1b1a77d6711",
  measurementId: "G-Y0783X7QLC"
};

//Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
    