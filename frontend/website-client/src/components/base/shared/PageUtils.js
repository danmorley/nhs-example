
/**
 *  Simple utility class for page helper functions.
 */
class PageUtils {
  static parentBreadcrumbForPage(page) {
    if (page && page.meta) {
      const breadcrumbs = page.meta.breadcrumbs || [];
      if (breadcrumbs.length > 0) {
        return breadcrumbs[breadcrumbs.length - 1];
      }
    }
    
    return null;
  }
}

export default PageUtils;
