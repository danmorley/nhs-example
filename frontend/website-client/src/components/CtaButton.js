import React, { Component } from 'react';

class CtaButton extends Component {
  render() {
    let { label, active, onClick } = this.props;
    if (active !== undefined && !active) return;
    if (!label) label = 'Submit';
    return (
      <button onClick={onClick} {...this.props}><Text tagName="span" content={label} /></button>
    );
  }
}

export default CtaButton;
