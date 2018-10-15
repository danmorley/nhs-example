import React, { Component } from 'react';
import Text from '../Text';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CtaUtils from "./CtaUtils";
import UrlUtils from "../shared/UrlUtils";

/**
 * Link component that will render a react router <Link> tag for internal
 * links, and a standard <a> tag for external links.
 *
 */
class CtaLink extends Component {
  render() {
    let { cta, variant, dataName } = this.props;

    if (!cta) return null;

    // Check to see if type present.
    if (cta.type) {
      cta = cta.value;
    }

    if (!CtaUtils.isValidCta(cta)) return null;

    var linkClass;

    const disabledClass = this.props.disabled ? ' disabled' : '';

    if (variant === 'button') {
      linkClass = 'button-cta' + disabledClass;
    }
    else if (variant === 'appstore') {
      linkClass = 'button-appstore' + disabledClass;
    }
    else if (variant === 'googleplay') {
      linkClass = 'button-googleplay' + disabledClass;
    }
    else if (variant === 'link') {
      linkClass = 'link-cta' + disabledClass;
    }
    else {
      linkClass = null;
    }

    const href = CtaUtils.getCtaPath(cta);

    // Render the link.
    if (UrlUtils.isExternalLink(href)) {
      // External link - use normal <a> tag.
      if (cta.document) {
        return (
          <a className={linkClass} href={href} download={href} data-name={dataName || cta.link_id}><Text tagName="span" content={cta.link_text} /></a>
        );
      } else {
        return (
          <a className={linkClass} href={href} data-name={dataName || cta.link_id}><Text tagName="span" content={cta.link_text} /></a>
        );
      }
    } else {
      // Internal link - use react router to prevent page refresh.
      return (
        <Link className={linkClass} to={href} data-name={dataName || cta.link_id}><Text tagName="span" content={cta.link_text} /></Link>
      );
    }
  }
}

CtaLink.propTypes = {
  cta: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool.isRequired,
  variant: PropTypes.string,
  dataName: PropTypes.string
};

export default CtaLink;
