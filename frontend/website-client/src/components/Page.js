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
import PromoShelf from './shelves/PromoShelf';

class Page extends Component {

  render() {
    if (!this.props.content) {
        return (<div>Loading</div>);
    }

    let { site, content } = this.props;
    let { title, body, page_theme } = content;
    let { menu, footer } = site;

    // Add a test promo shelf to all pages.
    body.push({
      id: 'xyz',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'image_on_left'
      }
    });

    body.push({
      id: 'abc',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png'
      }
    });

    body.push({
      id: 'abcd',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        background_image: 'http://aaa.bbb.ccc/gb.png'
      }
    });

    body.push({
      id: 'abcde',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_variant: 'blue_background'
      }
    });

    var shelves = body.map((shelf, i) => {
      const ShelfClass = ShelfRegistry.shelves[shelf.type];
      const shelfId = shelf.shelf_id || shelf.id;
      if (ShelfClass) {
        return (<ShelfClass key={i} content={shelf.value} id={shelfId}/>);
      } else {
        return (<PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId}/>);
      }
    });

    return (
      <div className={`page-wrapper ${page_theme && page_theme.class_name}`}>
        <PageHeader navItems={site.menu} header={site.header}/>
        <div className="page-content-wrapper">
          <div className="page-content">
            <p>You are on page: {content.title}</p>
            <div className="shelves">
              {shelves}
            </div>
          </div>
          <Footer className="page-footer" content={footer} site={site}/>
        </div>
      </div>
    );
  }
}

export default Page;
