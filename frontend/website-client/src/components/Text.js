import React, { Component } from 'react';

/**
 *  Text is a simple field that will output escaped text or
 *  raw HTML text.
 *
 *  It expects the following properties:
 *  - tagName
 *  - content
 *
 *  The content should be prefixed with 'html::' for the text
 *  to be treated as raw HTML.
 *
 *  Example usage:
 *
 *  <Text tagName="h3" content={content.title} />
 */
class Text extends Component {
  render() {
    let content = this.props.content || '';
    let Tag = this.props.tagName || 'p';
    if (content.startsWith('html::')) {
      return (<Tag dangerouslySetInnerHTML={{__html: content.substring(6)}} {...this.props}/>);
    } else {
      return (<Tag {...this.props}>{content}</Tag>);
    }
  }
}

export default Text;
