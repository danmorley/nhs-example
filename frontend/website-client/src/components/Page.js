import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/page.css';
import CmsComponentRegistry from './CmsComponentRegistry';
import Cookies from 'universal-cookie';
import CookieBanner from './cookie-banner/CookieBanner';
import Footer from './Footer';
import PageHeader from './page-header/PageHeader';
import PageStyles from './PageStyles';
import DocumentMeta from 'react-document-meta';
import ErrorBoundary from './ErrorBoundary';

// Wildcard imports are not supported by Babel without babel-wildcard plugin.
// Create react app template app hides away Babel, plugin can not be added. You must import
// all inputs explicitly.
// With the plugin import statement is as follows
// import * as Shelves from './shelves'
import PlaceholderShelf from './shelves/PlaceholderShelf';
import GeneralTextShelf from './shelves/GeneralTextShelf';
import BasicCtaShelf from './shelves/BasicCtaShelf';
import GuidanceShelf from './shelves/GuidanceShelf';
import MainCarouselShelf from './shelves/MainCarouselShelf';
import PanelCarouselShelf from './shelves/PanelCarouselShelf';
import GridShelf from './shelves/GridShelf';
import HeadingBodyShelf from './shelves/HeadingBodyShelf';
import NoticeShelf from './shelves/NoticeShelf';
import IframeShelf from './shelves/IframeShelf';
import ScriptShelf from './shelves/ScriptShelf';
import SiteMapShelf from './shelves/SiteMapShelf';
import DividerShelf from './shelves/DividerShelf';
import ArticlePageHeadingShelf from './shelves/ArticlePageHeadingShelf';

const cookies = new Cookies();
const deployed = cookies.get('cookieBanner');

class Page extends Component {
  render() {
    let { site, page } = this.props;

    if (page) {
      let { page_theme, page_styles } = page;
      const content = this.renderPageContent(page, site);
      const meta = this.pageMetaData(page, site);

      return (
        <DocumentMeta {...meta}>
          {this.renderPage(content, page_theme, page_styles, site, page)}
        </DocumentMeta>
      );

    } else {
      // Page object is null so it must still be loading.
      var content = this.renderPageLoader();
      return this.renderPage(content, null, null, site, null);
    }
  }

  renderPageContent(page, site) {
    let { body } = page;

    var shelves = body.map((shelf, i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfVariant = shelfInfo && shelfInfo.variant;
      const shelfLayout = shelfInfo && shelfInfo.layout;
      const shelfId = shelf.value.field_id || shelf.value.shelf_id || 'shelf-' + shelf.id;
      if (ShelfClass) {
        return (<ErrorBoundary key={i}><ShelfClass content={shelf.value} id={shelfId} site={site} classNamePrefix={shelfClassNamePrefix} variant={shelfVariant} layout={shelfLayout}/></ErrorBoundary>);
      } else {
        return (<PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/>);
      }
    });

    return shelves;
  }

  renderPageLoader() {
    return (
      <div className="center-block">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  renderPageLoadError() {
    const warningMessage = {
      heading: 'Page cannot be displayed',
      body: `<p>The page ${window.location.pathname} cannot be displayed.</p>`,
      meta_variant: 'warning'
    }

    return (
      <NoticeShelf content={warningMessage} />
    );
  }

  renderPage(content, pageTheme, pageStyles, site, _page) {
    let { menu, header, footer } = site;
    let theme = (pageTheme && pageTheme.class_name) || 'oneyou';

    return (
      <div className={`page-wrapper ${theme}`}>
        <PageStyles content={pageStyles} />
        { deployed !== "true" &&
          <CookieBanner />
        }
        <PageHeader navItems={menu.items} header={header}/>
        <div className="page-content-wrapper">
          <div id="page-content" className="page-content">
            {content}
          </div>
        </div>
        <Footer className="page-footer" content={footer} site={site}/>
      </div>
    );
  }

  pageMetaData(page, site) {
    const documentTitle = `${site.site_name} - ${page.meta.seo_title || page.title}`;

    return {
      title: documentTitle,
      description: page.meta.search_description,
      meta: {
        property: {
          'og:title': documentTitle,
          'og:description': page.meta.og_description,
          'og:url': page.meta.og_url || window.location.href,
          'og:image': page.meta.og_image,
          'og:type': page.meta.og_type
        },
        name: {
          'WT.cg_n': 'OneYou Core',
          'WT.cg_s': page.title,
          'DCSext.RealUrl': window.location.pathname,
          'twitter:url': page.meta.twitter_url || window.location.href,
          'twitter:card': page.meta.twitter_card,
          'twitter:site': page.meta.twitter_site,
          'twitter:title': documentTitle,
          'twitter:description': page.meta.twitter_description,
          'twitter:image': page.meta.twitter_image
        }
      }
    };
  }
}

Page.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

export default Page;
