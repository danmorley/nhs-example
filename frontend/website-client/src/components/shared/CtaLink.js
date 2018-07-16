import React, { Component } from 'react';
import Text from '../Text';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CtaUtils from "./CtaUtils";
import UrlUtils from "./UrlUtils";

/**
 * Link component that will render a react router <Link> tag for internal
 * links, and a standard <a> tag for external links.
 *
 */
class CtaLink extends Component {
  render() {
    let { cta, variant } = this.props;

    if (!cta) return null;

    // Check to see if type present.
    if (cta.type) {
      cta = cta.value;
    }

    if (!CtaUtils.isValidCta(cta)) return null;

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
    else if (variant === 'link') {
      linkClass = 'link-cta'
    }
    else {
      linkClass = null;
    }

    const href = CtaUtils.getCtaPath(cta);

    // Render the link.
    if (UrlUtils.isExternalLink(href)) {
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
  cta: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.string
};

export default CtaLink;
