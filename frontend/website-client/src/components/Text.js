import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CmsRichTextFormatter from './CmsRichTextFormatter';

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
    let { content, tagName, format, ...rest } = this.props;
    if (!content) return null;
    let Tag = tagName;

    if (format === 'richtext') {
      // Convert Wagtail internal links and images to real URLs.
      return <Tag {...rest}>{CmsRichTextFormatter.format(content)}</Tag>;

    } else if (format === 'html') {
      // Treat as straight HTML that doesn't require escaping.
      return (<Tag dangerouslySetInnerHTML={{__html: content}} {...rest}/>);

    } else if (content.startsWith('html::')) {
      // Treat as straight HTML that doesn't require escaping.
      return (<Tag dangerouslySetInnerHTML={{__html: content.substring(6)}} {...rest}/>);

    } else {
      // Treat as plain text and escape in normal way.
      return (<Tag {...rest}>{content}</Tag>);
    }
  }
}

Text.defaultProps = {
  tagName: 'div'
};

Text.propTypes = {
  content: PropTypes.string,
  tagName: PropTypes.string,
  format: PropTypes.string
}

export default Text;
