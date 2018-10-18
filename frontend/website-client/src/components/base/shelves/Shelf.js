import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TrackingUtils from '../shared/TrackingUtils';
import './shelves.css';

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // console.log('Tracking click', this.props.trackingGroup, this.props.id);
    if (this.props.trackingGroup) TrackingUtils.trackEvent(e.target, this.props.trackingGroup, 'Click', this.props.id);
  }

  render() {
    let { id, classNamePrefix, layout, variant, style, trackingGroup, classExtra, noPadding, children } = this.props;
    const classes = [
      'shelf',
      classNamePrefix,
      `${classNamePrefix}--${variant}`,
      `${classNamePrefix}--${layout}`,
      classExtra
    ]

    const sectionStyle = (noPadding) ? "shelf-section shelf-no-padding" : "shelf-section";  // Try and remove this as a section should have no padding.

    return (
      <section className={sectionStyle}>
        <div id={id} className={classes.join(' ')} style={style} data-tracking-group={trackingGroup} onMouseDown={this.handleClick}>
          {children}
        </div>
      </section>
    );
  }
}

Shelf.defaultProps = {
  classNamePrefix: 'basic',
  layout: 'standard_layout',
  variant: 'standard_variant',
  noPadding: false
};

Shelf.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  style: PropTypes.object,
  trackingGroup: PropTypes.string,
  id: PropTypes.string,
  noPadding: PropTypes.bool,
  classExtra: PropTypes.string
}

export default Shelf;
