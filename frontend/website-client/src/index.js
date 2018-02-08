import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let site = {
  name: 'One You',
  siteMenu: [],
};

let page = {
  name: 'Home Page',
  content: []
};


ReactDOM.render(<App site={site} page={page}/>, document.getElementById('root'));
registerServiceWorker();
