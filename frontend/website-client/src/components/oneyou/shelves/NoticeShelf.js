import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Text from '../../base/Text';

/**
 *  Application Notice Shelf is a simple shelf that can be used to
 *  display warning or error details to the user.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: 'Page Not Found',
 *    body: '<p>The page could not be found. Click <a href="/">here</a> to visit the home page.</p>',
 *    meta_variant: 'warning'
 *  }
 */
class NoticeShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <div className="row">
            <div className="shelf__col col-12">
              <h1>{content.header}</h1>
              <Text content={content.body} format="richtext" />
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

NoticeShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('notice_shelf', NoticeShelf, 'notice-shelf');

export default NoticeShelf;
