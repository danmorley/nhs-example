import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import homePage from './sample-data/HomePageSample';
import site from './sample-data/SiteSample';

// let site = {
//   name: 'One You',
//   siteMenu: [],
//   redirects: [],
// };

// let page = {
//   name: 'Home Page',
//   content: []
// };


ReactDOM.render(<App site={site()} page={homePage()}/>, document.getElementById('root'));
registerServiceWorker();
