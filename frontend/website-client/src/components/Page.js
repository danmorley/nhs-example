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
import BasicCtaShelf from './shelves/BasicCtaShelf';

class Page extends Component {

  render() {
    if (!this.props.content) {
        return (<div>Loading</div>);
    }

    let { site, content } = this.props;
    let { title, body, page_theme } = content;
    let { menu, footer } = site;
    let pageTheme = (page_theme && page_theme.class_name) || 'oneyou';

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
        meta_layout: 'full_width',
        meta_variant: 'main-banner'
      }
    });

    body.push({
      id: 'abc',
      type: 'promo_shelf',
      value: {
        heading: 'html::How are <span class="marker">you</span>? Quiz',
        cta_button_label: 'Have a go',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
      }
    });
    
    body.push({
      id: 'abc',
      type: 'promo_shelf',
      value: {
        heading: 'html::Tell us what <span class="marker">you</span> Think',
        cta_button_label: 'Send a message',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
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
      type: 'basic_cta_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_variant: 'blue_background'
      }
    });

    var shelves = body.map((shelf, i) => {
      const shelfInfo = ShelfRegistry.shelves[shelf.type]; 
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfId = shelf.shelf_id || shelf.id;
      if (ShelfClass) {
        return (<ShelfClass key={i} content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      } else {
        return (<PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      }
    });

    return (
      <div className={`page-wrapper ${pageTheme}`}>
        <PageHeader navItems={site.menu} header={site.header}/>
        <div className="page-content-wrapper">
          <div className="page-content">
            <p>You are on page: {content.title}</p>
            {shelves}
          </div>
          <Footer className="page-footer" content={footer} site={site}/>
        </div>
      </div>
    );
  }
}

export default Page;
