import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './shelves.css';

class Shelf extends Component {
  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `shelf ${classNamePrefix} ${classNamePrefix}--${this.props.variant}` : `shelf ${classNamePrefix}`;
  }

  render() {
    let sectionStyle = (this.props.layout) ? "shelf-section shelf-"+this.props.layout : "shelf-section";
    return (
      <section className={sectionStyle}>
        <div id={this.props.id} className={this.shelfClasses()} style={this.props.style}>
          {this.props.children}
        </div>
      </section>
    );
  }
}

Shelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string
}

export default Shelf;
