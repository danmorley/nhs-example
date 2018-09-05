import React from 'react';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import uniqueId from 'lodash.uniqueid';
import { Link } from 'react-router-dom';
import UrlUtils from './shared/UrlUtils';
import './cms-richtext-formatter.css';

/**
 * Helper class to process rich text 'body' fields according to a number of rules:
 *
 * 1. Links a made 'application aware' so links to internal pages will remain in the app
 *    and avoid full pages reloads.
 * 2. '---' in plain text is converted to HTML &mdash;
 * 3. '--' in plain text is converted to HTML &ndash;
 */
class CmsRichTextFormatter  {
  static format(content) {
    return Parser(content, parserOptions);
  }

  static renderLink(node) {
    if (node.attribs && node.attribs.linktype == 'page') {
      // Internal link - use react router to prevent page refresh.
      return (<Link to={node.attribs.href}>{domToReact(node.children, parserOptions)}</Link>);

    } else {
      // Simply return children if href attribute not given.
      if (!node.attribs.href) return domToReact(node.children, parserOptions);

      if (UrlUtils.isInternalLink(node.attribs.href)) {
        // Internal link - use react router to prevent page refresh.
        return (<Link to={node.attribs.href}>{domToReact(node.children, parserOptions)}</Link>);

      } else {
        // External link - use normal <a> tag.
        return (<a href={node.attribs.href}>{domToReact(node.children, parserOptions)}</a>);
      }
    }
  }

  static renderText(node) {
    if (node.data) {
      // Replace double or triple dashes with &endash; or &emdash;
      const translatedText = node.data.replace(/---/g, '&mdash;').replace(/--/g, '&ndash;');
      return <span dangerouslySetInnerHTML={{__html: translatedText}} />;
    }
  }

  static renderSeeMore(node) {
    if (node.children) {
      const id = uniqueId("rt-see-more-id-");
      return (
        <span className="rich-text-see-more">
          <input id={id} className="rich-text-see-more__input" type="checkbox" />
          <label htmlFor={id} className="rich-text-see-more__label"></label>
          <p>
            {node.children.map((child) =>
              child.data
            )}
          </p>
        </span>
      )
    }
  }
}

const parserOptions = {
  replace: (node, _options) => {
    if (node.type === 'tag' && node.name === 'a') {
      return CmsRichTextFormatter.renderLink(node);
    }

    if (node.type === 'text') {
      return CmsRichTextFormatter.renderText(node);
    }

    if (node.type === 'tag' && node.name === 'seemore') {
      return CmsRichTextFormatter.renderSeeMore(node);
    }
  }
};

export default CmsRichTextFormatter;
