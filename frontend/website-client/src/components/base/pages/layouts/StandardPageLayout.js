import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import '../../../assets/styles/page.css';
// import CmsComponentRegistry from '../CmsComponentRegistry';
import Footer from '../../../base/Footer';
import PageHeader from '../../../base/page-header/PageHeader';
import PageStyles from '../../PageStyles';
import DocumentMeta from 'react-document-meta';
import NoticeShelf from '../../shelves/NoticeShelf';
import UrlUtils from '../../../base/shared/UrlUtils';

class StandardPageLayout extends Component {
  render() {
    let { site, page } = this.props;

    if (page) {
      let { theme, page_styles } = page;
      const content = this.props.children;
      const meta = this.pageMetaData(page, site);

      return (
        <DocumentMeta {...meta}>
          {this.renderPage(content, theme, page_styles, site, page, meta.breadcrumbs)}
        </DocumentMeta>
      );

    } else {
      // Page object is null so it must still be loading.
      const content = this.renderPageLoader();
      return this.renderPage(content, null, null, site, null);
    }
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

  renderPage(content, pageTheme, pageStyles, site, _page, breadcrumbs) {
    let { site_menu, site_header, site_footer } = site;
    let theme = (pageTheme && pageTheme.class_name) || 'oneyou';
    let items = site_menu && "items" in site_menu ? site_menu.items : null;
    let headerComp;

    if (site_header) {
      headerComp = <PageHeader navItems={items} header={site_header} breadcrumbs={breadcrumbs}/>;
    }

    return (
      <div className={`page-wrapper ${theme} ${this.props.pageTypeClass}`}>
        <PageStyles content={pageStyles} />
        {headerComp}
        <div className="page-content-wrapper">
          <div id="page-content" className="page-content">
            {content}
          </div>
        </div>
        <Footer className="page-footer" content={site_footer} site={site}/>
      </div>
    );
  }

  getSEOTitle(isSiteHomePage, title, site_name, breadcrumbs) {
    if (isSiteHomePage || !title) {
      return site_name;
    } else {
      let pageTitles = [];
      // use breadcrumb in reverse oder to generate page tile
      if( breadcrumbs ){
        pageTitles = breadcrumbs.map((item) => item.name).splice(1).reverse();
      } else {
        console.log('No Breadcrumbs from API');
      }
      pageTitles.splice(0, 0, title);
      pageTitles.push(site_name);
      while(pageTitles.join(' | ').length > 60 && pageTitles.length > 2){
        pageTitles.splice(-2, 1)
      }
      return pageTitles.join(' | ');
    }
  }

  pageMetaData(page, site) {
    const title = `${page.meta.seo_title || page.title}`;
    const SEOTitle = this.getSEOTitle(UrlUtils.isSiteHomePage(), title, site.site_name, page.meta.breadcrumbs);
    return {
      title: SEOTitle,
      breadcrumbs: page.meta.breadcrumbs,
      description: page.meta.search_description,
      meta: {
        property: {
          'og:title': SEOTitle,
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
          'twitter:title': SEOTitle,
          'twitter:description': page.meta.twitter_description,
          'twitter:image': page.meta.twitter_image
        }
      }
    };
  }
}

StandardPageLayout.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object,
  pageTypeClass: PropTypes.string.isRequired
}

export default StandardPageLayout;
