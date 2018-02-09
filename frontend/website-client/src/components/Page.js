import React, { Component } from 'react';
// import './assets/styles/Page.css'
import ShelfRegistry from './ShelfRegistry'
import SiteNav from './SiteNav'

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Shelves from './shelves'
import PlaceholderShelf from './shelves/PlaceholderShelf';
import GeneralTextShelf from './shelves/GeneralTextShelf';

class Page extends Component {
  render() {
    var shelves = this.props.content.page_content.map(function (shelf) {
      const ShelfClass = ShelfRegistry.shelves[shelf.type];
      if (ShelfClass) {
        return (<ShelfClass content={shelf.value} />);
      } else {
        return (<PlaceholderShelf shelfType={shelf.type} />);
      }
    });

    return (
      <div className="page">
        <div className="page-header">
          <h1>The Page Header</h1>
          <SiteNav items={this.props.site.siteMenu} />
        </div>
        <div className="page-content">
          <p>You are on page: {this.props.content.title}</p>
          <div className="shelves">
            {shelves}
          </div>
        </div>
        <div className="page-footer">
          <p>The page footer</p>
        </div>
      </div>
    );
  }
}

export default Page;
