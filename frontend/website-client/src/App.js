import React, { Component } from 'react';
import 'normalize.css'
import 'bootstrap-4-grid/css/grid.css';
import './assets/styles/fonts.css';
import './assets/styles/App.css';
import Page from './components/Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: props.site || {},
      currentPage: props.page || {},
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.site.name}</h1>
        <p>
          You are on page: {this.state.currentPage.title}
        </p>
        <hr />
        <Page content={this.state.currentPage} site={this.state.site} />
      </div>
    );
  }
}

export default App;
