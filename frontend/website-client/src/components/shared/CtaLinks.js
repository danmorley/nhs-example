import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cta-links.css';
import CtaLink from './CtaLink';
import CtaList from './CtaList';

/**
 *  Link component that will render a react router <Link> tag for internal
 *  links, and a standard <a> tag for external links.
 *
 *  cta: {
 *    link_text: 'Find out more',
 *    link_external: 'http://www.edfs.co.uk'
 *  }
 */
class CtaLinks extends Component {
  render() {
    let { cta, variant } = this.props;
    if (!cta) return null;

    if (cta instanceof Array) {
      // Return a list of cta links.
      return (
        <CtaList items={cta} variant={variant} disabled={this.props.disabled} />
      );
    } else {
      // Return a single cta link.
      return (
        <CtaLink cta={cta} variant={variant} disabled={this.props.disabled} />
      );
    }
  }
}

CtaLinks.propTypes = {
  cta: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
  disabled: PropTypes.bool.isRequired,
  variant: PropTypes.string
};

export default CtaLinks;
