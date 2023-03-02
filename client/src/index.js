import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { store } from "./redux/store"
import  dotenv from "dotenv";
import axios from "axios"
const dotenvSafe = require("dotenv-safe");

dotenv.config()
// haciendo un commit para que las variables de entorno en vercel surtan efecto
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


