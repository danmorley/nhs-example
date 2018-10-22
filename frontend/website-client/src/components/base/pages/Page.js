import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../CmsComponentRegistry';
import DocumentMeta from 'react-document-meta';
import StandardPageLayout from '../../oneyou/pages/layouts/StandardPageLayout';
import ShareButtonShelf from '../../oneyou/shelves/ShareButtonShelf';
import NoticeShelf from '../../oneyou/shelves/NoticeShelf';

import GeneralPageContent from './GeneralPageContent';
import OneYouGeneralPageContent from '../../oneyou/pages/GeneralPageContent';
import OneYouRecipePageContent from '../../oneyou/pages/RecipePageContent';
import SexhealthGeneralPageContent from '../../sexhealth/pages/SexhealthGeneralPageContent';
import BackToTopButton from '../../oneyou/BackToTopButton';
import UrlUtils from '../shared/UrlUtils';

/**
 *  Component responsible for rendering the header, footer and content of all
 *  pages.
 *
 *  site: the site definition (will always be provided)
 *  page: the page definiton. This will be null until the page def has been loaded.
 */
class Page extends Component {
  render() {
    let { site, page } = this.props;

    if (page) {
      const { page_theme, page_styles } = page;
      page.type = page.meta.type || 'general_page';

      const pageInfo = CmsComponentRegistry.components[page.type];
      const PageClass = pageInfo && pageInfo.class;
      // TODO: Handle no page for type
      const content = <PageClass page={page} site={site} />;
      const meta = this.pageMetaData(page, site);

      return (
        <DocumentMeta {...meta}>
          {this.renderPage(content, page_theme, page_styles, site, page, pageInfo)}
        </DocumentMeta>
      );

    } else {
      // Page object is null so it must still be loading.
      var content = this.renderPageLoader();
      return this.renderPage(content, null, null, site, null, null);
    }
  }

  renderPage(content, pageTheme, pageStyles, site, page, pageInfo) {
    // let { menu, header, footer } = site;
    // let theme = (pageTheme && pageTheme.class_name) || 'oneyou';
    const pageTypeClass = (pageInfo)? `${pageInfo.classNamePrefix}-page` : 'general';
    const meta = (page && page.meta.hasOwnProperty('use_share_button')) ? page.meta : page;
    const useShareButton = page && (meta.use_share_button || meta.use_email_button || meta.use_print_button);

    return (
      <StandardPageLayout site={site} page={page} pageTypeClass={pageTypeClass}>
        {content}
        {useShareButton &&
          <ShareButtonShelf showShareButton={meta.use_share_button}
            showEmailButton={meta.use_email_button}
            showPrintButton={meta.use_print_button}
            opt1={meta.opt_in_1_text} 
            opt2={meta.opt_in_2_text}
            tsAndCs ={meta.ts_and_cs_statement}
            trackingGroup={meta.tracking_group}
          />
        }
        { page && <BackToTopButton trackingGroup={meta.tracking_group} />}
      </StandardPageLayout>
    );
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

  pageMetaData(page, site) {
    const documentTitle = (UrlUtils.isSiteHomePage()) ? site.site_name : `${page.meta.seo_title || page.title} | ${site.site_name}`;

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
  page: PropTypes.object
}

export default Page;
