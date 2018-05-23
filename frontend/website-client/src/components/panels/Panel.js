import React, { Component } from 'react';
import './panels.css';
import PropTypes from 'prop-types';

class Panel extends Component {
  panelClasses() {
    let classNamePrefix = this.props.classNamePrefix;
    return this.props.variant ? `panel ${classNamePrefix} ${classNamePrefix}--${this.props.variant}` : `panel ${classNamePrefix}`;
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
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string
};

export default Panel;
