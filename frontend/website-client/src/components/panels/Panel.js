import React, { Component } from 'react';
import styles from './panels.css';

class Panel extends Component {
  panelId() {
    return this.props.id ? 'panel-' + this.props.id : null;
  }

  panelClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `panel ${classNamePrefix}-panel ${this.props.variant}-panel` : `panel ${classNamePrefix}-panel`;
  }

  render() {
    return (
      <div id={this.panelId()} className={this.panelClasses()} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
