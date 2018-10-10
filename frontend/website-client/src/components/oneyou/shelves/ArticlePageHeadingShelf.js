import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './article-page-heading-shelf.css';
import { Link } from 'react-router-dom';
import UrlUtils from '../../base/shared/UrlUtils';

/**
 *  Article Page Heading Shelf is used to display article headings and an
 *  optional back button.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    display_back_button: True or False,
 *    back_button_label: "Back"
 *  }
 */
class ArticlePageHeadingShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant } = this.props;
    let metaVariant = content.meta_variant || variant;
    // let metaLayout = content.meta_layout || layout;

    const parentPath = UrlUtils.parentPath(window.location.pathname);

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          <div className="row justify-content-center align-items-center">
            <div className="shelf__col col-12">
              {content.display_back_button && <Link to={parentPath} className="shelf__backbutton">{content.back_button_label}</Link>}
              <Text tagName="h1" content={content.heading} />
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

ArticlePageHeadingShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('article_page_heading_shelf', ArticlePageHeadingShelf, 'article-page-heading-shelf');

export default ArticlePageHeadingShelf;
