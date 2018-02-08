import React, { Component } from 'react';
import 'normalize.css'
import 'bootstrap-4-grid/css/grid.css';
import './assets/styles/fonts.css';
import './assets/styles/App.css'

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
        <p className="App-intro">
          <h1>Welcome to {this.state.site.name}</h1>
          <p>You are on page: {this.state.currentPage.name}</p>
        </p>
      </div>
    );
  }
}

export default App;
