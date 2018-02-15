import request from 'request-promise-native';

function ContentStore(apiEndpointUrl) {
  // Hard coded for dev.
  // if (!apiEndpointUrl) apiEndpointUrl = 'http://localhost:9000/api/v2';
  apiEndpointUrl = 'http://localhost:9000/api/v2';
  this.apiEndpointUrl = apiEndpointUrl;
}

ContentStore.prototype.getSite = async function(key) {
  return await _getSite(this.apiEndpointUrl, key);
};

ContentStore.prototype.getPage = async function(key) {
  return await _getPage(this.apiEndpointUrl, key);
  // const contentStoreUrl = _dbUrlForCredentials(this.credentials);
  // return primitives.getDocument(contentStoreUrl, type, key);
};


async function _getSite(apiEndpointUrl, key) {
  console.debug('_getSite: Entry');
  let siteUrl = apiEndpointUrl + '/sites/' + key;
  let options = {
    url: siteUrl,
    json: true
  }

  try {
    console.debug('_getSite: A1');
    const response = await request(options);
    console.debug('_getSite: A2');
    return { code: 0, response: response };
  }
  catch (error) {
    console.debug('_getSite: A3 - error');
    return { code: -1, error: 'Error getting site data', info: { statusCode: error.statusCode, message: error.message } };
  }
}

async function _getPage(apiEndpointUrl, key) {
  console.debug('_getPage: Entry');
  let pageUrl = apiEndpointUrl + '/pages/' + key;
  let options = {
    url: pageUrl,
    json: true
  }

  try {
    console.debug('_getPage: A1');
    const response = await request(options);
    console.debug('_getPage: A2');
    return { code: 0, response: response };
  }
  catch (error) {
    console.debug('_getPage: A3 - error');
    return { code: -1, error: 'Error getting page data', info: { statusCode: error.statusCode, message: error.message } };
  }
}

export default ContentStore;
