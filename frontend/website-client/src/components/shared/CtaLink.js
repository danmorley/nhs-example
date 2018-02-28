import React, { Component } from 'react';
import Text from '../Text';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *  Link component that will render a react router <Link> tag for internal
 *  links, and a standard <a> tag for external links.
 *
 *  cta: {
 *    link_text: 'Some link text',
 *    link_external: 'http://',
 *    page: 5,
 *  }
 */
class CtaLink extends Component {
  isExternal(link) {
    return link && (link.startsWith('http://') || link.startsWith('https://'));
  }

  render() {
    let { cta, variant } = this.props;
    if (!cta || (!cta.page && !cta.link_external)) return null;
    let linkClass = (variant === 'button') ? 'button-cta' : null;

    // Convert page id to path if given.
    let href = (cta.page) ? '/page/' + cta.page : cta.link_external;

    // Render the link.
    if (this.isExternal(href)) {
      // External link - use normal <a> tag.
      return (
        <a className={linkClass} href={href}><Text tagName="span" content={cta.link_text} /></a>
      );
    } else {
      // Internal link - use react router to prevent page refresh.
      return (
        <Link className={linkClass} to={href}><Text tagName="span" content={cta.link_text} /></Link>
      );
    }
  }
}

CtaLink.propTypes = {
  cta: PropTypes.object.isRequired,
  variant: PropTypes.string
};

export default CtaLink;
