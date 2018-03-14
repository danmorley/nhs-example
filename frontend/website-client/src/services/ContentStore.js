import request from 'request-promise-native';

function ContentStore(contentStoreEndpoint, site, release) {
  this.contentStoreEndpoint = contentStoreEndpoint;
  this.site = site;
  this.release = release;
}

ContentStore.prototype.getSite = async function() {
  return await _getSite(this.contentStoreEndpoint, this.site, this.release);
};

ContentStore.prototype.getPage = async function(pageId) {
  return await _getPage(this.contentStoreEndpoint, this.site, this.release, pageId);
};

/**
 *  Get site json for the given website and release.
 *
 *  <contentStoreEndpoint>/sites/<site>/<release>
 *
 *  Examples:
 *
 *  https://oneyou-cms.service.nhs.uk/api/v2/sites/oneyou/current
 *  https://oneyou-cms.service.nhs.uk/api/v2/sites/oneyou/47872384982394723987
 */
async function _getSite(contentStoreEndpoint, site, release) {
  console.debug('_getSite: Entry');
  let siteUrl = contentStoreEndpoint + '/sites/' + site +'/';
  // let siteUrl = `${contentStoreEndpoint}/sites/${site}/${release}`;
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

/**
 *  Get json content for a page in the given website and release.
 *
 *  <contentStoreEndpoint>/sites/<site>/<release>/pages/<pageId>
 *
 *  Examples:
 *
 *  https://oneyou-cms.service.nhs.uk/api/v2/sites/oneyou/current/pages/4
 *  https://oneyou-cms.service.nhs.uk/api/v2/sites/oneyou/47872384982394723987/pages/4
 */
async function _getPage(contentStoreEndpoint, site, release, pageId) {
  console.debug('_getPage: Entry');
  let pageUrl = contentStoreEndpoint + '/pages/' + pageId;
  // let pageUrl = `${contentStoreEndpoint}/sites/${site}/${release}/pages/${pageId}`;
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
