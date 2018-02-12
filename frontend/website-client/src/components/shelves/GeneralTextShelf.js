import React, { Component } from 'react';
// import './assets/styles/Page.css'
import ShelfRegistry from '../ShelfRegistry'

/**
 *  General Text Shelf is a simple shelf that can be used to
 *  display rich text.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    text: "<p>Some <b>HTML</b> text to print.</p>"
 *  }
 */
class GeneralTextShelf extends Component {
  render() {
    return (
      <div className="shelf">
        <p>General Text Shelf</p>
        <p dangerouslySetInnerHTML={{__html: this.props.content.text}} />
      </div>
    );
  }
}

ShelfRegistry.register(GeneralTextShelf, 'general_text_shelf');

export default GeneralTextShelf;
