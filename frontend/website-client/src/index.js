import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import ContentStore from './services/ContentStore';
import queryString from 'query-string';
import UrlUtils from './components/base/shared/UrlUtils';

/**
 *  Script to 'load' the website into the 'root' element.
 *
 *  The root element may have one or more of the following data attributes:
 *
 *  <div id="root"
 *       data-content-store-endpoint="https://oneyou-cms.service.nhs.uk/api"
 *       data-site="oneyou"
 *       data-release="1293129038712093824" />
 *
 *  data-content-store-endpoint: "https://oneyou-cms.service.nhs.uk/api"
 */

(function (context) {
  function getPageName(path) {
    return 'nhs:phe' + path.replace(/\/$/, '').replace(/\//g, ':');
  }

  function getCategories(path) {
    return path.split('/').filter(Boolean);
  }

  context.setDigitalData = function() {
    var path = document.location.pathname;
    var categories = getCategories(path);

    window.digitalData = {
      page: {
        category: {
          primaryCategory: categories[0],
          subCategory1: categories[1],
          subCategory2: categories[2],
          subCategory3: categories[3]
        },
        pageInfo: {
          pageName: getPageName(path)
        }
      }
    };
  }
})(global);

      // global.AdobeDataLayer = function () {
      //   function getPageName(path) {
      //     return 'nhs:phe' + path.replace(/\/$/, '').replace(/\//g, ':');
      //   }

      //   function getCategories(path) {
      //     return path.split('/').filter(Boolean);
      //   }

      //   var setDigitalData = function () {
      //     console.log('digitalData')
      //     var path = document.location.pathname;
      //     var categories = getCategories(path);
      //     window.digitalData = {
      //       page: {
      //         category: {
      //           primaryCategory: categories[0],
      //           subCategory1: categories[1],
      //           subCategory2: categories[2],
      //           subCategory3: categories[3]
      //         },
      //         pageInfo: {
      //           pageName: getPageName(path)
      //         }
      //       }
      //     };
      //   }
      // };

let rootElem = document.getElementById('root');
const siteSlug = UrlUtils.siteSlugFromPath(window.location.pathname);
global.rootUrl = rootElem.getAttribute('data-site') ? '/' + rootElem.getAttribute('data-site') : '/' + siteSlug;
let dataContentStoreEndpoint = rootElem.getAttribute('data-content-store-endpoint') || 'http://localhost:8000/api';
let dataSite = rootElem.getAttribute('data-site') || siteSlug;
let dataRelease = rootElem.getAttribute('data-release') || 'current';

// Ensure query param release id is used if given.
let params = queryString.parse(window.location.search);
if (params.id) dataRelease = params.id;
if (params.cms) dataContentStoreEndpoint = params.cms;
if (params.cmsid) dataRelease = params.cmsid;

let is_preview = 'is_preview' in params ? true : false;
let preview_revision = params.revision || null;
global.contentStore = new ContentStore(dataContentStoreEndpoint, dataSite, dataRelease, is_preview, preview_revision);

// Load site.json before mounting the React app.
global.contentStore.getSite().then((site) => {
  if (site.code === 0) {
    global.contentStore.release = site.response.meta.release_id; // Set release to the actual release guid
    ReactDOM.render(<App site={site && site.response}/>, rootElem);
    // registerServiceWorker();
    unregister();
  } else {
    console.error(site.error, site.info.statusCode, site.info.message);
    if (site.info.statusCode === 404) {
      ReactDOM.render(<div className="container"><h1>Page not found.</h1><p>Please retry later.</p></div>, rootElem);
    } else {
      ReactDOM.render(<div className="container"><h1>Something went wrong.</h1><p>Please refresh or try again later.</p></div>, rootElem);
    }
    // registerServiceWorker();
    unregister();
  }
});
