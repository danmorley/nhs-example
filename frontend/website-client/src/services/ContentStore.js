import ServerError from './ServerError';

function ContentStore(contentStoreEndpoint, site, release, is_preview, preview_revision) {
  this.contentStoreEndpoint = contentStoreEndpoint;
  this.site = site;
  this.release = release;
  this.is_preview = is_preview;
  this.preview_revision = preview_revision;
}

ContentStore.prototype.getSite = async function() {
  return await _getSite(this.contentStoreEndpoint, this.site, this.release);
};

ContentStore.prototype.getPage = async function(pageId) {
  if (this.is_preview) {
    console.log("PREVIEW");
    return await _getPreviewPage(this.contentStoreEndpoint, this.site, pageId, this.preview_revision);
  } else {
    return await _getPage(this.contentStoreEndpoint, this.site, this.release, pageId);
  }
};

/**
 *  Get site json for the given website and release.
 *
 *  <contentStoreEndpoint>/sites/<site>/<release>
 *
 *  Examples:
 *
 *  https://oneyou-cms.service.nhs.uk/api/sites/oneyou/current
 *  https://oneyou-cms.service.nhs.uk/api/sites/oneyou/47872384982394723987
 */
async function _getSite(contentStoreEndpoint, site, release) {
  let siteUrl = `${contentStoreEndpoint}/sites/${site}/${release}/`;

  try {
    const response = await _getRequest(siteUrl);
    return { code: 0, response: response };
  }
  catch (error) {
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
 *  https://oneyou-cms.service.nhs.uk/api/sites/oneyou/current/pages/4
 *  https://oneyou-cms.service.nhs.uk/api/sites/oneyou/47872384982394723987/pages/4
 */
async function _getPage(contentStoreEndpoint, site, release, pageId) {
  let pageUrl = `${contentStoreEndpoint}/sites/${site}/${release}/pages/${pageId}/`;

  try {
    const response = await _getRequest(pageUrl);
    return response ?
      { code: 0, response: response } :
      { code: -1, error: 'Error getting page data', info: { statusCode: '-1', message: 'Page might need to be published' } };
  }
  catch (error) {
    return { code: -1, error: 'Error getting page data', info: { statusCode: error.statusCode, message: error.message } };
  }
}

async function _getPreviewPage(contentStoreEndpoint, site, pageId, previewRevision) {
  let pageUrl = `${contentStoreEndpoint}/preview/pages/${pageId}/revisions/${previewRevision}/`;

  try {
    const response = await _getRequest(pageUrl);
    return response ?
      { code: 0, response: response } :
      { code: -1, error: 'Error getting page data', info: { statusCode: '-1', message: 'Page might need to be published' } };
  }
  catch (error) {
    return { code: -1, error: 'Error getting page data', info: { statusCode: error.statusCode, message: error.message } };
  }
}

/**
 *  Helper function to simplify netwrok request and error handling.
 */
async function _getRequest(url) {
  let data = await (await (fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new ServerError(res.status, res.statusText);
      }
    })
    .catch(err => {
      throw err;
    })
  ))
  return data;
}

export default ContentStore;
