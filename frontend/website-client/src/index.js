import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import site from './sample-data/SiteSample';
import ContentStore from './services/ContentStore';
import invert from 'lodash.invert';

global.rootUrl = '';

/**
 *  Script to 'load' the website into the 'root' element.
 *
 *  The root element may have one or more of the following data attributes:
 *
 *  <div id="root"
 *       data-content-store-endpoint="https://oneyou-cms.service.nhs.uk/api/v2"
 *       data-site="oneyou"
 *       data-release="1293129038712093824" />
 *
 *  data-content-store-endpoint: "https://oneyou-cms.service.nhs.uk/api/v2"
 */
let rootElem = document.getElementById('root');
let dataContentStoreEndpoint = rootElem.getAttribute('data-content-store-endpoint') || 'http://localhost:8000/api/v2';
let dataSite = rootElem.getAttribute('data-site') || '2';       // NOTE: Change '2' to 'oneyou';
let dataRelease = rootElem.getAttribute('data-release') || 'current';
global.contentStore = new ContentStore(dataContentStoreEndpoint, dataSite, dataRelease);

// Load site.json before mounting the React app.
global.contentStore.getSite().then((site) => {
  if (site.code === 0) {
    global.pages = invert(site.response.pages);
    ReactDOM.render(<App site={site && site.response}/>, rootElem);
    registerServiceWorker();
  } else {
    console.log(site.error, site.info.statusCode, site.info.message);
    ReactDOM.render(<h1>Unable to display the One You website. Please retry later.</h1>, rootElem);
    registerServiceWorker();
  }
});
