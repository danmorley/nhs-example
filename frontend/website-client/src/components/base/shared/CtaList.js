import React, { Component } from 'react';
import CtaLink from '../../base/shared/CtaLink';
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
    if (!items || items.length === 0) return null;

    let ctaItems = items.map((item, i) => {
      return (<li className="cta-list__item" key={i}><CtaLink cta={item} variant={variant} disabled={this.props.disabled} /></li>);
    });

    return (
      <ul className="cta-list">
        {ctaItems}
      </ul>
    );
  }
}

CtaList.defaultProps = {
  disabled: false
}

CtaList.propTypes = {
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string
};

export default CtaList;
