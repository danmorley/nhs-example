import React, { Component } from 'react';
import Text from './Text';
import { Link } from 'react-router-dom';

/**
 *  Link component that will render a react router <Link> tag for internal
 *  links, and a standard <a> tag for external links.
 */
class CtaLink extends Component {
  isExternal(link) {
    return link && (link.startsWith('http://') || link.startsWith('https://'));
  }

  render() {
    let { link, active } = this.props;
    if (active !== undefined && !active) return null;
    if (!link) return null;
    if (this.isExternal(link)) {
      // External link - use normal <a> tag.
      return (
        <a href={link} className="button-cta"><Text tagName="span" content={this.props.children} /></a>
      );
    } else {
      // Internal link - use react router to prevent page refresh.
      return (
        <Link to={link} className="button-cta"><Text tagName="span" content={this.children} /></Link>
      );
    }
  }
}

export default CtaLink;
