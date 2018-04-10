import startsWith from 'lodash.startswith';

/**
 *  Simple utility class for URL jhelper functions.
 */
class UrlUtils {
  static isInternalLink(link) {
    return !UrlUtils.isExternalLink(link);
  }

  static isExternalLink(link) {
    return link && (startsWith(link, 'http://') || startsWith(link, 'https://'));
  }
}

export default UrlUtils;
