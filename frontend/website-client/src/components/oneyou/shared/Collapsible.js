import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.innerRef = React.createRef();
    this.outerRef = React.createRef();
  }

  handleTriggerClick(event) {
    event.preventDefault();
    this.setState(prevState => ({open: !prevState.open}));
  }

  render() {
    const transition = `height 200ms linear`;
    const height = this.state.open ? this.innerRef.current.offsetHeight : 0;
    const dropdownStyle = {
      height: height,
      WebkitTransition: transition,
      msTransition: transition,
      transition: transition,
      overflow: 'hidden'
    }

    const triggerClass = this.state.open ? 'is-open' : 'is-closed';
    const TriggerElement = this.props.triggerTagName;

    return (
      <div className="Collapsible">
        <TriggerElement
          className={`Collapsible__trigger ${triggerClass}`}
          onClick={this.handleTriggerClick}
          style={this.props.triggerStyle}
          onKeyPress={(event) => {
            const { key } = event;
            if (key === ' ' || key === 'Enter') {
              this.handleTriggerClick(event);
            }
          }}
          tabIndex={this.props.tabIndex}
        >
          {this.props.trigger}
        </TriggerElement>
        <div className="Collapsible__contentOuter" ref={this.outerRef} style={dropdownStyle}>
          <div className="Collapsible__contentInner" ref={this.innerRef}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  triggerTagName: PropTypes.string,
  triggerStyle: PropTypes.object,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  triggerDisabled: PropTypes.bool,
  tabIndex: PropTypes.number
}

Collapsible.defaultProps = {
  triggerTagName: 'span',
  triggerDisabled: false,
  triggerStyle: null,
  tabIndex: null
};

export default Collapsible;
