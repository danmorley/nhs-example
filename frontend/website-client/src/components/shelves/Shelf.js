import React, { Component } from 'react';
import styles from './shelves.css';

class Shelf extends Component {
  shelfId() {
    return this.props.id ? 'shelf-' + this.props.id : null;
  }
  
  shelfClasses() {
    let classNamePrefix = this.props.classNamePrefix || 'basic';
    return this.props.variant ? `shelf ${classNamePrefix} ${classNamePrefix}--${this.props.variant}` : `shelf ${classNamePrefix}`;
  }
  
  render() {
    let sectionStyle = (this.props.layout) ? "shelf-section shelf-"+this.props.layout : "shelf-section";
    return (
      <section className={sectionStyle}>
        <div id={this.shelfId()} className={this.shelfClasses()} style={this.props.style}>
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Shelf;
