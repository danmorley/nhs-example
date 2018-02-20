import React, { Component } from 'react';

/**
 *  Text is a simple field that will output escaped text or
 *  raw HTML text.
 *
 *  It expects the following properties:
 *  - content
 *
 *  The content should be prefixed with 'html::' for the text
 *  to be treated as raw HTML.
 */
class Text extends Component {
  render() {
    let content = this.props.content || '';
    if (content.startsWith('html::')) {
      return (<p dangerouslySetInnerHTML={{__html: content.substring(6)}} />);
    } else {
      return (<p>{content}</p>);
    }
  }
}

export default Text;
