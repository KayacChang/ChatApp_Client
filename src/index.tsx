import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { connect } from './backend'

connect(process.env.REACT_APP_BACKEND || 'ws://localhost:8080/ws')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
