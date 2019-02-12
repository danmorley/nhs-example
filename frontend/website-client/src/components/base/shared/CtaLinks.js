import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cta-links.css';
// import CtaLink from './CtaLink';
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
    let { ctas, variant } = this.props;
    if (!ctas) return null;

    if (ctas instanceof Array) {
      // Return a list of cta links.
      return (
        <CtaList items={ctas} variant={variant} disabled={this.props.disabled} />
      );
    } else {
      // Return a single cta link.
      return (
        <CtaList items={[ctas]} variant={variant} disabled={this.props.disabled} />
      );
    }
  }
}

CtaLinks.defaultProps = {
  disabled: false
}

CtaLinks.propTypes = {
  ctas: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
  disabled: PropTypes.bool,
  variant: PropTypes.string
};

export default CtaLinks;
