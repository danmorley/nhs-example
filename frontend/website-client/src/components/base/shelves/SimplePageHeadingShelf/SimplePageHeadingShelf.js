import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../../base/shelves/Shelf';
import Text from '../../../base/Text';
import CmsComponentRegistry from '../../../base/CmsComponentRegistry';
import './simple-page-heading-shelf.css';
import { Link } from 'react-router-dom';
import UrlUtils from '../../../base/shared/UrlUtils';
import PageUtils from '../../shared/PageUtils';

/**
 *  Simple Page Heading Shelf is used to display a simple heading and an
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
class SimplePageHeadingShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant, context } = this.props;
    let metaVariant = content.meta_variant || variant;
    // let metaLayout = content.meta_layout || layout;

    const parentBreadcrumb = PageUtils.parentBreadcrumbForPage(context.page);

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          <div className="row justify-content-center align-items-center">
            <div className="shelf__col col-12">
              {content.display_back_button && <Link to={parentBreadcrumb.url} className="shelf__backbutton">{content.back_button_label}</Link>}
              <Text tagName="h1" content={content.heading} />
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

SimplePageHeadingShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string,
  context: PropTypes.object.isRequired
}

CmsComponentRegistry.register('simple_page_heading_shelf', SimplePageHeadingShelf, 'simple-page-heading-shelf');

export default SimplePageHeadingShelf;
