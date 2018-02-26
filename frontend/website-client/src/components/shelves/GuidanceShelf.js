import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';

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
 *    text: "<p>Some <b>HTML</b> text to print.</p>"
 *  }
 */
class GuidanceShelf extends Component {
  render() {
    return (
      <Shelf id={this.props.id} classNamePrefix={this.props.classNamePrefix}>
        <h2>{this.props.content.heading}</h2>
        <p dangerouslySetInnerHTML={{__html: this.props.content.body}} />
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('guidance_shelf', GuidanceShelf, 'guidance');

export default GuidanceShelf;
