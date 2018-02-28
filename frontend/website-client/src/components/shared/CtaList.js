import React, { Component } from 'react';
import CtaLink from './CtaLink';
import PropTypes from 'prop-types';

/**
 *
 *  items: [
 *
 *  ]
 */
class CtaList extends Component {
  render() {
    let { items, variant } = this.props;
    if (!items) return null;

    let ctaItems = items.map((item, i) => {
      return (<li key={i}><CtaLink cta={item} variant={variant} /></li>);
    });

    return (
      <ul className="cta-list">
        {ctaItems}
      </ul>
    );
  }
}

CtaList.propTypes = {
  items: PropTypes.array.isRequired,
  variant: PropTypes.string.isRequired
};

export default CtaList;
