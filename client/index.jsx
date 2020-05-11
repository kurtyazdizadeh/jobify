import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import bsCustomFileInput from 'bs-custom-file-input';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
);

bsCustomFileInput.init();
