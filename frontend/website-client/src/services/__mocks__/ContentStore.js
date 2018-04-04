import request from 'request-promise-native';
const fs = require('fs');


function ContentStore(contentStoreEndpoint, site, release) {
  this.contentStoreEndpoint = contentStoreEndpoint;
  this.site = site;
  this.release = release;
}

ContentStore.prototype.getSite = async function() {
    const siteData = fs.readFileSync(`./src/services/__mocks__/__mockData__/site.json`, 'utf8');
    return JSON.parse(siteData);
};

ContentStore.prototype.getPage = async function(pageId) {
    const pagesData = fs.readFileSync(`./src/services/__mocks__/__mockData__/pages.json`, 'utf8');
    const pagesJson = JSON.parse(pagesData);
    return {"code": 0, "response": pagesJson[pageId]};
};

export default ContentStore;
