import React, { Component } from 'react';
import 'normalize.css'
import 'bootstrap-4-grid/css/grid.css';
import './assets/styles/fonts.css';
import './assets/styles/App.css';
import Page from './components/Page';
import homePage from './sample-data/HomePageSample';
import aboutPage from './sample-data/AboutPageSample';
import pageNotFound from './sample-data/PageNotFound';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: props.site || {},
      currentPage: null,
    };
  }

  // Temporary function to simulate round trip to server for page content.
  delay(t, v) {
    return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, v), t)
    });
  }

  componentDidMount() {
    this.checkForRedirect();
    let path = this.pageToRender();
    console.log('Rendering page ' + path);
    this.delay(1000).then(() => {
      let page = pageNotFound();
      if (path === '/home') page = homePage();
      if (path === '/about') page = aboutPage();

      this.setState({ currentPage: page });
    });
  }

  checkForRedirect() {
    let redirect = (this.state.site.redirects && this.state.site.redirects[window.location.pathname]);
    if (redirect) window.location.pathname = redirect;
  }

  pageToRender() {
    let path = window.location.pathname;
    if (path === '/') return '/home';
    return path;
  }

  loadPage(props) {
    return (<Page content={this.state.currentPage} site={this.state.site} />);
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.site.name}</h1>
        <p>You are on page: {this.state.currentPage && this.state.currentPage.title}</p>
        <p>Global root URL is: {global.rootUrl}</p>
        <hr />

        <Router>
          <Switch>
            <Route path='/'
              render={(props) => {return this.loadPage(props)}
            }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
