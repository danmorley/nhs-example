import React from 'react';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { Link } from 'react-router-dom';

/**
 *  Helper class to convert links and images in Wagtail rich text fields to actual
 *  links and images with actual URLs. The resulting link will be 'application aware'
 *  so links to internal pages will remain in the app and avoid full pages reloads.
 */
class CmsRichTextFormatter  {
  static format(content) {
    return Parser(content, parserOptions);
  }

  static renderLink(node) {
    if (node.attribs.linktype === 'page') {
      // Internal link - use react router to prevent page refresh.
      const href = this.pathForPage(node.attribs.id);

      return (
        <Link to={href}>{domToReact(node.children, parserOptions)}</Link>
      );
    } else {
      // External link - use normal <a> tag.
      return (
        <a href={node.attribs.href}>{domToReact(node.children, parserOptions)}</a>
      );
    }
  }

  static pathForPage(pageId) {
    return global.pages[pageId];
  }
}

const parserOptions = {
  replace: (node, options) => {
    // do not replace if element has no attributes
    if (!node.attribs) return;

    if (node.type === 'tag' && node.name === 'a') {
      return CmsRichTextFormatter.renderLink(node);
    }
  }
};

export default CmsRichTextFormatter;
