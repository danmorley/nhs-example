import React, { Component } from 'react';
import '../assets/styles/page.css';
import CmsComponentRegistry from './CmsComponentRegistry';
import Cookies from 'universal-cookie';
import CookieBanner from './cookie-banner/CookieBanner';
import Footer from './Footer';
import PageHeader from './page-header/PageHeader';
import PageStyles from './PageStyles';
import DocumentMeta from 'react-document-meta';

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
import NoticeShelf from './shelves/NoticeShelf';
import IframeShelf from './shelves/IframeShelf';
import ScriptShelf from './shelves/ScriptShelf';
import SiteMapShelf from './shelves/SiteMapShelf';

const cookies = new Cookies();
const deployed = cookies.get('cookieBanner');

class Page extends Component {

  renderPage(content, pageTheme, pageStyles, site, page) {
    let { menu, header, footer } = site;
    let theme = (pageTheme && pageTheme.class_name) || 'oneyou';

    return (
      <div className={`page-wrapper ${theme}`}>
        <PageStyles content={pageStyles} />
        { deployed !== "true" &&
          <CookieBanner />
        }
        <PageHeader navItems={menu} header={header}/>
        <div className="page-content-wrapper">
          <div className="page-content">
            {content}
          </div>
        </div>
        <Footer className="page-footer" content={footer} site={site}/>
      </div>
    );
  }

  render() {
    let { site, page } = this.props;

    if (page) {
      let { title, body, page_theme, page_styles } = page;
      let { menu, footer } = site;
      // let pageTheme = (page_theme && page_theme.class_name) || 'oneyou';

      const documentTitle = `${site.site_name} - ${page.title}`;
      const meta = {
        title: documentTitle,
        description: page.meta.search_description,
        meta: {
          property: {
            'og:title': documentTitle,
            'og:description': 'to do',
            'og:url': 'to do',
            'og:image': 'to do',
            'og:type': 'to do'
          },
          name: {
            'twitter:url': 'to do',
            'twitter:card': 'to do',
            'twitter:site': 'to do',
            'twitter:title': documentTitle,
            'twitter:description': 'to do',
            'twitter:imgae': 'to do'
          }
        }
      };

      var shelves = body.map((shelf, i) => {
        const shelfInfo = CmsComponentRegistry.components[shelf.type];
        const ShelfClass = shelfInfo && shelfInfo.class;
        const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
        const shelfVariant = shelfInfo && shelfInfo.variant;
        const shelfLayout = shelfInfo && shelfInfo.layout;
        const shelfId = shelf.value.field_id || shelf.id;
        if (ShelfClass) {
          return (<ShelfClass key={i} content={shelf.value} id={shelfId} site={site} classNamePrefix={shelfClassNamePrefix} variant={shelfVariant} layout={shelfLayout}/>);
        } else {
          return (<PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
        }
      });

      // <DocumentMeta {...meta}>this.renderPage(shelves, page_theme, page_styles, site, page)</DocumentMeta>

      return (
        <DocumentMeta {...meta}>{this.renderPage(shelves, page_theme, page_styles, site, page)}</DocumentMeta>
      );

    } else {
      var content = (
        <div className="center-block">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      );
      return this.renderPage(content, null, null, site, null);
    }
  }
}

export default Page;
