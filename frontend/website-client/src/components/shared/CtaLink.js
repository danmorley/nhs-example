import React, { Component } from 'react';
import Text from '../Text';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import startsWith from 'lodash.startswith';
import CtaUtils from "./CtaUtils";

/**
 *  Link component that will render a react router <Link> tag for internal
 *  links, and a standard <a> tag for external links.
 *
 *  cta: {
 *    link_text: 'Some link text',
 *    link_external: 'http://',
 *    link_page: 5,
 *  }
 */
class CtaLink extends Component {
  isExternal(link) {
    return link && (startsWith(link, 'http://') || startsWith(link, 'https://'));
  }

  static pathForPage(pageId) {
    return global.rootUrl + global.pages[pageId];
  }

  render() {
    let { cta, variant } = this.props;

    if (!cta) return null;

    // Check to see if type present.
    if (cta.type) {
      cta = cta.value;
    }

    if (!cta.link_page && !cta.link_external) return null;
    var linkClass;

    if (variant === 'button') {
      linkClass = 'button-cta'
    }
    else if (variant === 'appstore') {
      linkClass = 'button-appstore'
    }
    else if (variant === 'googleplay') {
      linkClass = 'button-googleplay'
    }
    else {
      linkClass = null;
    }

    // Convert page id to path if given.
    let href = (!CtaUtils.isInternalLink(cta.link_page) ) ? cta.link_external : cta.link_page.relative_path;

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
  cta: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
  variant: PropTypes.string
};

export default CtaLink;
