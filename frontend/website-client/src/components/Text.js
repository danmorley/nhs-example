import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    let { content, tagName, ...rest } = this.props;
    if (!content) return null;
    let Tag = tagName;
    if (content.startsWith('html::')) {
      return (<Tag dangerouslySetInnerHTML={{__html: content.substring(6)}} {...rest}/>);
    } else {
      return (<Tag {...rest}>{content}</Tag>);
    }
  }
}

Text.defaultProps = {
  tagName: 'p'
};

Text.propTypes = {
  content: PropTypes.string.isRequired,
  tagName: PropTypes.string
}

export default Text;
