import snakecase from 'lodash.snakecase';

/**
 *  Simple utility class for custom tracking functions.
 */
class TrackingUtils {
  /**
   *  Track a mouse event on the passed element.
   */
  static trackEvent(elem, trackingGroup, eventName, shelfId) {
    let name = elem.getAttribute('data-name');
    if (!name) {
      // Try parent.
      if (elem.parentNode) name = elem.parentNode.getAttribute('data-name');
    }

    if (!name) {
      // No data-name attribute found on the element or its parent. If elem is a link, use its text.
      if (elem.tagName === 'A') {
        name = elem.innerText;
      }
      if (elem.parentNode.tagName === 'A') {
        // Try parent.
        name = elem.parentNode.innerText;
      }
    }

    if (name) {
      const key = `DCSext.${trackingGroup}${eventName}`;
      const value = `${shelfId}-${snakecase(name)}`;
      console.log('Tracking:', key, ',', value);

      if (window.dcsMultiTrack) {
        window.dcsMultiTrack(key, value, 'WT.dl', '121');
      }
    }
  }

  static trackPageLoad(page) {
    if (window.dcsMultiTrack) {
      window.dcsMultiTrack(
        'WT.cg_n', 'OneYou Core',
        'WT.cg_s', page.response.title,
        'DCSext.RealUrl', window.location.pathname);
    }
  }
}

export default TrackingUtils;
