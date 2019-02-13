import React, { Component } from 'react';
import './panels.css';
import PropTypes from 'prop-types';

class Panel extends Component {
  panelClasses() {
    const classNamePrefix = this.props.classNamePrefix || 'basic';
    const variantClass = this.props.variant && (classNamePrefix + '--' + this.props.variant) || '';
    const layoutClass = this.props.layout && (classNamePrefix + '--' + this.props.layout) || '';
    return `panel ${classNamePrefix} ${variantClass} ${layoutClass}`;
  }

  render() {
    return (
      <div id={this.props.id} className={this.panelClasses()} style={this.props.style}>
        {this.props.children}
       </div>
    );
  }
}

Panel.propTypes = {
  classNamePrefix: PropTypes.string,
  variant: PropTypes.string,
  layout: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string
};

export default Panel;
