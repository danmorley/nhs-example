import React, { Component } from 'react';
// import './assets/styles/Page.css'
import ShelfRegistry from './ShelfRegistry'
import SiteNav from './header-nav/SiteNav'
import Footer from './Footer';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Shelves from './shelves'
import PlaceholderShelf from './shelves/PlaceholderShelf';
import GeneralTextShelf from './shelves/GeneralTextShelf';

class Page extends Component {
  render() {
    if (!this.props.content) {
        return (<div>Loading</div>);
    }

    let { title, body } = this.props.content;
    let { menu, footer } = this.props.site;

    var shelves = body.map((shelf, i) => {
      const ShelfClass = ShelfRegistry.shelves[shelf.type];
      if (ShelfClass) {
        return (<ShelfClass key={i} content={shelf.value} />);
      } else {
        return (<PlaceholderShelf key={i} shelfType={shelf.type} />);
      }
    });

    return (
      <div className="page">
        <div className="page-header">
          <h1>The Page Header</h1>
          <p>----</p>
          <SiteNav navItems={menu} />
          <p>----</p>
        </div>
        <div className="page-content">
          <p>You are on page: {title}</p>
          <div className="shelves">
            {shelves}
          </div>
        </div>
        <Footer className="page-footer" content={footer} site={this.props.site}/>
      </div>
    );
  }
}

export default Page;
