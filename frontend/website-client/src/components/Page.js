import React, { Component } from 'react';
import '../assets/styles/page.css';
import CmsComponentRegistry from './CmsComponentRegistry';
import Footer from './Footer';
import PageHeader from './page-header/PageHeader';
import PageStyles from './PageStyles';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Shelves from './shelves'
import PlaceholderShelf from './shelves/PlaceholderShelf';
import GeneralTextShelf from './shelves/GeneralTextShelf';
import BasicCtaShelf from './shelves/BasicCtaShelf';
import GuidanceShelf from './shelves/GuidanceShelf';
import CarouselShelf from './shelves/CarouselShelf';
import GridShelf from './shelves/GridShelf';
import HeadingBodyShelf from './shelves/HeadingBodyShelf';

class Page extends Component {

  render() {
    if (!this.props.content) {
        return (<div>Loading</div>);
    }

    let { site, content } = this.props;
    let { title, body, page_theme, page_styles } = content;
    let { menu, footer } = site;
    let pageTheme = (page_theme && page_theme.class_name) || 'oneyou';

    var shelves = body.map((shelf, i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfVariant = shelfInfo && shelfInfo.variant;
      const shelfLayout = shelfInfo && shelfInfo.layout;
      const shelfId = shelf.value.field_id || shelf.id;
      if (ShelfClass) {
        return (<ShelfClass key={i} content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix} variant={shelfVariant} layout={shelfLayout}/>);
      } else {
        return (<PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      }
    });

    return (
      <div className={`page-wrapper ${pageTheme}`}>
        <PageStyles content={page_styles} />
        <PageHeader navItems={menu} header={site.header}/>
        <div className="page-content-wrapper">
          <div className="page-content">
            {shelves}
          </div>
          <Footer className="page-footer" content={footer} site={site}/>
        </div>
      </div>
    );
  }
}

export default Page;
