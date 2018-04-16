import React, { Component } from 'react';
import 'normalize.css';
import './assets/styles/fonts.css';
import Page from './components/Page';
import ShelfSamplesPage from './components/pages/ShelfSamplesPage';
import SiteMapPage from './components/pages/SiteMapPage';
import notFoundPage from './data/notFoundPage';
import ContentStore from './services/ContentStore';
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
      currentPage: null,
    };
  }

  componentWillMount() {
    let path = this.checkForRedirect() || this.pagePathToRender(window.location.pathname);
    console.log('First time load of page for path ' + path);
    if (!this.isAppPage(path)) {
      console.log('Loading cms page', path);
      let key = this.pageSlug(path);

      this.loadPageForKey(key);
    } else {
      console.log('Loading app page', path);
    }

    // Detect when the user navigates to a new page.
    //
    // history.listen detects when the user navigates within the site and
    // returns a function to cancel the listener for use in the component
    // unmount.
    const that = this;
    this.historyUnlisten = history.listen((location, action) => {
      console.log('Internal load of page for path ' + location.pathname);
      let path = this.pagePathToRender(location.pathname);
      if (!this.isAppPage(path)) {
        path = path.replace(global.rootUrl, '');
        console.log('Loading cms page', path);
        let key = this.pageSlug(path);
        this.loadPageForKey(key);
      } else {
        path = path.replace(global.rootUrl, '');
        console.log('Loading app page', path);
      }
    });
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
    console.log('Loading page for key', key);
    App.setContentVisibile(false);

    if (key !== undefined) {
      global.contentStore.getPage(key).then((page) => {
        if (page.code === 0) {
          this.setState({ currentPage: page.response });
        } else {
          console.log(page.error, page.info.statusCode, page.info.message);
          this.setState({ currentPage: notFoundPage() });
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
    this.state.site.redirects.map((redirect, i) => {
      console.log("REDIRECT", redirect);

      if (redirect.source + '/' === window.location.pathname) {
        console.log("match")
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
    let path_minus_slash = path.replace(/\/$/, "");
    let slug = path_minus_slash.substr(path_minus_slash.lastIndexOf('/') + 1)
    return slug
  }

  loadPage(props) {
    // console.log(this.state);
    return (<Page page={this.state.currentPage} site={this.state.site} />);
  }

  isAppPage(path) {
    return path === '/shelf-samples/';
    // return path.match(/\/shelf-samples[\/]?/);
  }

  render() {
    return (
      <div className="App">

        <Router history={history}>
          <Switch>
            <Route path={global.rootUrl + '/shelf-samples'}
              render={() => <ShelfSamplesPage site={this.state.site} />
            }/>
            <Route path={global.rootUrl + '/sitemap'}
              render={() => <SiteMapPage site={this.state.site} />
            }/>
            <Route path={global.rootUrl + '/'}
              render={(props) => {return this.loadPage(props)}
            }/>
          </Switch>
        </Router>

        <hr />
        <p>Site name: {this.state.site.site_name}</p>
        <p>Page title: {this.state.currentPage && this.state.currentPage.title}</p>
        <p>Global root URL: {global.rootUrl}</p>
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
      let scrollTarget = document.getElementById(hash.substring(1));
      if (scrollTarget) {
        scrollTarget.scrollIntoView();
        window.scrollBy(0, -80);
      }
    } else {
      contentElem.classList.add('hidden');
    }
  }
}

export default App;
