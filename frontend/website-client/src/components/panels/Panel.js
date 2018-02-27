import React, { Component } from 'react';
import styles from './panels.css';
import PropTypes from 'prop-types';

class Panel extends Component {
  panelId() {
    return this.props.id ? 'panel-' + this.props.id : null;
  }

  panelClasses() {
    let classNamePrefix = this.props.classNamePrefix;
    return this.props.variant ? `panel ${classNamePrefix} ${classNamePrefix}--${this.props.variant}` : `panel ${classNamePrefix}`;
  }

  render() {
    return (
      <div id={this.panelId()} className={this.panelClasses()} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

Panel.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  style: PropTypes.object
};

export default Panel;
