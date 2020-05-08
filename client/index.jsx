import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import bsCustomFileInput from 'bs-custom-file-input';

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

bsCustomFileInput.init();
