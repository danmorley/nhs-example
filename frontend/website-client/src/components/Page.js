import React, { Component } from 'react';
import '../assets/styles/page.css'
import ShelfRegistry from './shelves/ShelfRegistry'
import SiteNav from './header-nav/SiteNav'
import Footer from './Footer';
import PageHeader from './page-header/PageHeader'

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
      <div className="page-wrapper">
        <PageHeader navItems={this.props.site.menu} />
        <div className="page-content-wrapper">
          <div className="page-content">
            <p>You are on page: {this.props.content.title}</p>
            <div className="shelves">
              {shelves}
            </div>
          </div>
          <Footer className="page-footer" content={footer} site={this.props.site}/>
        </div>
      </div>
    );
  }
}

export default Page;
