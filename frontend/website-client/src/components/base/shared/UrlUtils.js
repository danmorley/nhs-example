import startsWith from 'lodash.startswith';

/**
 *  Simple utility class for URL jhelper functions.
 */
class UrlUtils {
  static isInternalLink(link) {
    return !UrlUtils.isExternalLink(link);
  }

  static isExternalLink(link) {
    return link && (startsWith(link, 'http://') || startsWith(link, 'https://') || startsWith(link, 'mailto:') || startsWith(link, 'javascript:'));
  }

  static pathMinusSlash(path) {
    return path.slice(-1) === '/' ? path.substring(0, path.length-1) : path;
  }

  static pathWithSlash(path) {
    return path.slice(-1) === '/' ? path : path + '/';
  }

  static parentPath(path) {
    const n = UrlUtils.pathMinusSlash(path).lastIndexOf('/');
    return path.substr(0, n);
  }
  static isSiteHomePage() {
    return UrlUtils.pathMinusSlash(window.location.pathname) === global.rootUrl;
  }

  static siteSlugFromPath() {
    return UrlUtils.pathMinusSlash(window.location.pathname).split("/")[1];
  }
}

export default UrlUtils;
