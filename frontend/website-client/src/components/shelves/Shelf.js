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
    e.preventDefault();
    // console.log('Tracking click', this.props.trackingGroup, this.props.id);
    if (this.props.trackingGroup) TrackingUtils.trackEvent(e.target, this.props.trackingGroup, 'Click', this.props.id);
  }

  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `shelf ${classNamePrefix} ${classNamePrefix}--${this.props.variant}` : `shelf ${classNamePrefix}`;
  }

  render() {
    const { id, layout, style, trackingGroup, children } = this.props;
    let sectionStyle = (layout) ? "shelf-section shelf-" + layout : "shelf-section";

    return (
      <section className={sectionStyle}>
        <div id={id} className={this.shelfClasses()} style={style} data-tracking-group={trackingGroup} onMouseDown={this.handleClick}>
          {children}
        </div>
      </section>
    );
  }
}

Shelf.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  style: PropTypes.object,
  trackingGroup: PropTypes.string,
  id: PropTypes.string
}

export default Shelf;
