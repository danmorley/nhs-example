
/**
 *  Simple utility class for shelf helper functions.
 */
class ShelfUtils {
  static shelfContainerClass(shelfContent, defaultClass) {
    if (shelfContent) {
      if (shelfContent.meta_width === 'full') return 'container-fluid';
    }
    return defaultClass || 'container';
  }
}

export default ShelfUtils;
