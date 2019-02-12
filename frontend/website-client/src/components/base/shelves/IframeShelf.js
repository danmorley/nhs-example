import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Text from '../../base/Text';

/**
 *  iFrame Shelf is a simple shelf that can be used to
 *  display external content in an iframe.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: 'Optional heading',
 *    title: 'Title for screen readers',
 *    src: 'https://link.to.content/',
 *    frameborder: '0',
 *    scrolling: 'no',
 *    field_id: 'hay-container',
 *    height: '400px',
 *    width: '400px',
 *    sandbox: 'allow-same-origin'
 *  }
 * 
 * The title value is used to describe the iframe for accessibility purposes. If the title
 * is not given, aria-hidden="true" is used to hide the iframe from the user.
 */
class IframeShelf extends Component {
  render() {
    const { id, content, classNamePrefix } = this.props;
    const hideFromScreenReader = !content.title;
    const wrapperId = content.meta_wrapper_div_id || `${id}-wrapper`;
    const iframeStyle = {
      width: content.width || '100%',
      height: content.height || '300px'
    };
    
    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <Text tagName="h2" className="shelf__header" content={content.heading} />
          <div id={wrapperId} className={content.meta_wrapper_div_class}>
            <iframe
              id={content.meta_iframe_id}
              title={content.title}
              src={content.src}
              style={iframeStyle}
              frameBorder={content.frame_border || '0'}
              scrolling={content.scrolling || 'auto'}
              height={iframeStyle.height}
              width={iframeStyle.width}
              sandbox={content.sandbox || undefined}
              aria-hidden={hideFromScreenReader}
              seamless={true}>
            </iframe>
          </div>
        </div>
      </Shelf>
    );
  }
}

IframeShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
}

CmsComponentRegistry.register('iframe_shelf', IframeShelf, 'iframe-shelf');

export default IframeShelf;
