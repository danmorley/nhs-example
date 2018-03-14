import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import queryString from 'query-string';

/**
 *  Guidance Shelf is a simple shelf that can be used to
 *  document and provide guidance for other shelves on
 *  Shelf Samples pages.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "The heading",
 *    body: "<p>Some <b>HTML</b> text to print.</p>"
 *  }
 */
class GuidanceShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;
    let params = queryString.parse(window.location.search);
    if (params.clean && params.clean === 'true') return null;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <h2>{content.heading}</h2>
        <p dangerouslySetInnerHTML={{__html: content.body}} />
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('guidance_shelf', GuidanceShelf, 'guidance-shelf');

export default GuidanceShelf;
