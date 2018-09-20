import snakecase from 'lodash.snakecase';

/**
 *  Simple utility class for custom tracking functions.
 */
class TrackingUtils {
  /**
   *  Track a mouse event on the passed element.
   */
  static trackEvent(elem, trackingGroup, eventName, shelfId) {
    let name = TrackingUtils.nameFromElem(elem);
    if (!name) name = TrackingUtils.nameFromInlineLinkElem(elem);
    if (!name) name = TrackingUtils.nameFromSlickCarouselElem(elem);

    if (name) {
      const key = `DCSext.${trackingGroup}${TrackingUtils.eventFromElem(elem) || eventName}`;
      const value = `${shelfId}-${snakecase(name)}`;
      // console.log('Tracking:', key, ',', value);

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

  static nameFromElem(elem) {
    let name = elem.getAttribute('data-name');
    if (!name) {
      // Try parent.
      if (elem.parentNode) name = elem.parentNode.getAttribute('data-name');
    }
    return name;
  }

  static eventFromElem(elem) {
    let event = elem.getAttribute('data-tracking-event');
    if (!event) {
      // Try parent.
      if (elem.parentNode) event = elem.parentNode.getAttribute('data-tracking-event');
    }
    return event;
  }

  static nameFromInlineLinkElem(elem) {
    let name;

    // If elem is a link, use its text.
    if (elem.tagName === 'A') {
      name = elem.innerText;
    }
    if (elem.parentNode.tagName === 'A') {
      // Try parent.
      name = elem.parentNode.innerText;
    }

    return name;
  }

  static nameFromSlickCarouselElem(elem) {
    let name;

    // If elem is a button, it is a carousel control.
    if (elem.tagName === 'BUTTON') {
      if (elem.classList.contains('slick-next')) {
        name = 'Next';
      } else if (elem.classList.contains('slick-prev')) {
        name = 'Previous';
      } else {
        let parent = elem.parentNode;
        if (parent && parent.tagName === 'LI') {
          parent = parent.parentNode;
          if (parent && parent.tagName === 'UL') {
            if (parent.classList.contains('slick-dots')) {
              name = 'Dot' + elem.innerText;
            }
          }
        }
      }
    }

    return name;
  }
}

export default TrackingUtils;
