import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';

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
 *    src: 'https://link.to.content/',
 *    frameborder: '0',
 *    scrolling: 'no',
 *    field_id: 'hay-container',
 *    height: '400px',
 *    width: '400px',
 *    sandbox: 'allow-same-origin'
 *  }
 */
class IframeShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <iframe
          id={id}
          src={content.src}
          frameBorder={content.frame_border || '0'}
          scrolling={content.scrolling || 'auto'}
          height={content.height || '300px'}
          width={content.width || '100%'}
          sandbox={content.sandbox || undefined}
          seamless>
        </iframe>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('iframe_shelf', IframeShelf, 'iframe-shelf');

export default IframeShelf;
