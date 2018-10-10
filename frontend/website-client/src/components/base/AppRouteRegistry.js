import UrlUtils from './shared/UrlUtils';

class AppRouteRegistry  {
  static routes = {};

  /**
   *  Register a local path or regular expression.
   */
  static register(name, path) {
    AppRouteRegistry.routes[name] = path;
  }

  static routeIsLocal(path) {
    const pathMinusSlash = UrlUtils.pathMinusSlash(path);
    const keys = Object.keys(AppRouteRegistry.routes);
    for (let i = 0; i <= keys.length; i++) {
      const localPath = AppRouteRegistry.routes[keys[i]];
      if (pathMinusSlash === localPath) { return true; }
    }
    return false;
  }
}

export default AppRouteRegistry;
