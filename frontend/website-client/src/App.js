import React, { Component } from 'react';
import 'normalize.css'
import './assets/styles/fonts.css';
import Page from './components/Page';
import pageNotFound from './sample-data/PageNotFound';
import ContentStore from './services/ContentStore';
import createHistory from 'history/createBrowserHistory';

import {
  Router,
  Redirect,
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
    // Detect when the user navigates to a new page.
    //
    // history.listen detects when the user navigates within the site and 
    // returns a function to cancel the listener for use in the component
    // unmount.
    this.historyUnlisten = history.listen((location, action) => {
      console.log('Loading page for path ' + location.pathname);
      let key = this.state.site.pages[location.pathname];
      this.loadPageForKey(key);
    });
  }

  componentWillUnmount() {
      this.historyUnlisten();
  }

  componentDidMount() {
    let path = this.checkForRedirect() || this.pagePathToRender();
    console.log('Loading page for path ' + path);
    let key = this.state.site.pages[path];
    this.loadPageForKey(key);
  }

  loadPageForKey(key) {
    let contentStore = new ContentStore('http://localhost:9002/api/v2');
    contentStore.getPage(key).then((page) => {
      if (page.code === 0) {
        this.setState({ currentPage: page.response });
      } else {
        console.log(page.error, page.info.statusCode, page.info.message);
        this.setState({ currentPage: pageNotFound() });
      }
    });
  }

  checkForRedirect() {
    let redirect = (this.state.site.redirects && this.state.site.redirects[window.location.pathname]);
    if (redirect) {
      if (redirect.startsWith('http:') || redirect.startsWith('https:')) {
        // Redirect to another site.
        window.location.pathname = redirect;
      } else {
        // Redirect to a relative path without causing a page refresh.
        window.history.replaceState('', '', redirect);
      }
    }

    return redirect;
  }

  pagePathToRender() {
    let path = window.location.pathname;
    // if (path === '/') return '/home';
    return path;
  }

  loadPage(props) {
    return (<Page content={this.state.currentPage} site={this.state.site} />);
  }

  render() {
    return (
      <div className="App">

        <Router history={history}>
          <Switch>
            <Route path='/'
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
}

export default App;
