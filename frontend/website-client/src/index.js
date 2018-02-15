import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import site from './sample-data/SiteSample';
import ContentStore from './services/ContentStore';

global.rootUrl = '';

// Load site.json before mounting the React app.
let contentStore = new ContentStore('http://localhost:9001/api/v2');
contentStore.getSite('3').then((site) => {
  if (site.code === 0) {
    ReactDOM.render(<App site={site && site.response}/>, document.getElementById('root'));
    registerServiceWorker();
  } else {
    console.log(site.error, site.info.statusCode, site.info.message);
    ReactDOM.render(<h1>Unable to display the One You website. Please retry later.</h1>, document.getElementById('root'));
    registerServiceWorker();
  }
});
