import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'normalize.css';
import './assets/styles/fonts.css';
import AppRouteRegistry from './components/base/AppRouteRegistry';
import Page from './components/base/pages/Page';
import ShelfSamplesPage from './components/oneyou/pages/ShelfSamplesPage';
import siteMapPage from './components/oneyou/pages/SiteMapPage';
import CookieDeclarationPage from './components/oneyou/pages/CookieDeclarationPage';
import { notFoundPage, serverErrorPage } from './data/exceptionPages';
import createHistory from 'history/createBrowserHistory';
import startsWith from 'lodash.startswith';

import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: props.site || {},
      currentPage: null
    };

    AppRouteRegistry.register('shelfSamples', '/shelf-samples');
    AppRouteRegistry.register('sitemap', '/sitemap');
    AppRouteRegistry.register('cookieDeclaration', '/cookie-declaration');
  }

  componentDidMount() {
    let path = this.pagePathToRender(window.location.pathname);
    console.log('First time load of page for path ' + path);
    if (!AppRouteRegistry.routeIsLocal(path)) {
      console.log('Loading cms page', path);
      let key = path.substring(1, path.length-1);
      this.loadPageForKey(key);
    } else {
      console.log('Loading app page', path);
    }

    // Detect when the user navigates to a new page.
    //
    // history.listen detects when the user navigates within the site and
    // returns a function to cancel the listener for use in the component
    // unmount.
    this.historyUnlisten = history.listen((location, _action) => {
      console.log('Internal load of page for path ' + location.pathname);
      let path = this.pagePathToRender(location.pathname);
      if (!AppRouteRegistry.routeIsLocal(path)) {
        path = path.replace(global.rootUrl, '');
        console.log('Loading cms page', path);
        let key = path.substring(1, path.length-1);
        this.loadPageForKey(key);
      } else {
        path = path.replace(global.rootUrl, '');
        console.log('Loading app page', path);
        // Clear down the CMS page while app page is being displayed.
        this.setState({ currentPage: null });
      }
    });

    // App is about to render for the first time. Remove the page spinner.
    const pageSpinner = document.getElementById('pageSpinner');
    if (pageSpinner) pageSpinner.parentNode.removeChild(pageSpinner); // Works with IE too!
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  /**
   *  Called on first render, or whenever the browser location changes.
   *
   *  Fetches the page content and sets it to the current page to cause
   *  a re-render of the new page.
   */
  loadPageForKey(key) {
    if (!key || key == '/') key = 'home';
    key = key.replace(/\//g, '|');
    console.log('Loading page for key', key);
    App.setContentVisibile(false);

    if (key !== undefined) {
      global.contentStore.getPage(key).then((page) => {
        if (page.code === 0) {
          this.setState({ currentPage: page.response });
          if (window.dcsMultiTrack) {
            window.dcsMultiTrack(
              'WT.cg_n', 'OneYou Core',
              'WT.cg_s', page.response.title,
              'DCSext.RealUrl', window.location.pathname);
          }
        } else {
          console.error(page.error, page.info.statusCode, page.info.message);
          if (page.info.statusCode === 404) {
            this.setState({ currentPage: notFoundPage() });
          } else {
            this.setState({ currentPage: serverErrorPage() });
          }
        }
        App.setContentVisibile(true);
      });
    } else {
      console.log('No such page in site');
      this.setState({ currentPage: notFoundPage() });
      App.setContentVisibile(true);
    }
  }

  checkForRedirect() {
    this.state.site.redirects.map((redirect, _i) => {
      console.log('Redirecting to:', redirect);

      const path_minus_slash = window.location.pathname.replace(/\/$/, '');

      if (redirect.source === path_minus_slash) {
        if (startsWith(redirect, 'http:') || startsWith(redirect, 'https:')) {
          // Redirect to another site.
          window.location.pathname = redirect.destination;
        } else {
          // Redirect to a relative path without causing a page refresh.
          window.history.replaceState('', '', redirect.destination);
        }
      }
    });
  }

  // Take path from window location and ensure it has a trailing slash.
  pagePathToRender(pathname) {
    let path = pathname.replace(global.rootUrl, '');
    return path.slice(-1) === '/' ? path : path + '/';
  }

  pageSlug(path) {
    // Remove trailing slash
    let path_minus_slash = path.replace(/\/$/, '');
    let slug = path_minus_slash.substr(path_minus_slash.lastIndexOf('/') + 1)
    return slug
  }

  loadPage(_props) {
    // console.log('loadPage: ', this.state);
    return (<Page page={this.state.currentPage} site={this.state.site} />);
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path={global.rootUrl + AppRouteRegistry.routes.shelfSamples}
              render={() => <ShelfSamplesPage site={this.state.site} />
              }/>
            <Route path={global.rootUrl + AppRouteRegistry.routes.sitemap}
              render={() => <Page page={siteMapPage(this.state.site)} site={this.state.site} />
              }/>
            <Route path={global.rootUrl + AppRouteRegistry.routes.cookieDeclaration}
              render={() => <CookieDeclarationPage site={this.state.site} />
              }/>
            <Route path={global.rootUrl + '/'}
              render={(props) => {return this.loadPage(props)}
              }/>
          </Switch>
        </Router>
      </div>
    );
  }

  // Helper functions.

  static setContentVisibile(visible) {
    const contentElem = document.getElementById('page-content');
    if (!contentElem) return;

    if (visible) {
      // Making the content visible after load - ensure it is initially at the top,
      // then scroll to the fragment identifier if given.
      window.scrollTo(0, 0);
      contentElem.classList.remove('hidden');
      const hash = window.location.hash;
      if (hash) {
        let scrollTarget = document.getElementById(hash.substring(1));
        const pageHeaderElem = document.querySelector('.page-header');
        const offset = (pageHeaderElem)? pageHeaderElem.clientHeight : 0;
        if (scrollTarget) {
          scrollTarget.scrollIntoView();
          window.scrollBy(0, -offset);
        }
      }
    } else {
      contentElem.classList.add('hidden');
    }
  }
}

App.propTypes = {
  site: PropTypes.object.isRequired
}

export default App;
