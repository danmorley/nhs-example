
/**
 *  Simple utility class for page helper functions.
 */
class PageUtils {
  static parentBreadcrumbForPage(breadcrumbs) {
    if (breadcrumbs.length > 0) {
      let index = breadcrumbs.length - 1;
      let parentBreadcrumbPage = breadcrumbs[index];
      while (index >= 0 && !parentBreadcrumbPage.visible) {
        index--;
        parentBreadcrumbPage = breadcrumbs[index];
        console.log(breadcrumbs[index]);
      }
      return parentBreadcrumbPage;
    }
  }
}

export default PageUtils;
