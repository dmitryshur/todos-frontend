import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function render() {
  const rootDOM = document.getElementById('app');
  ReactDOM.render(<App />, rootDOM);
}

window.addEventListener('load', render);
