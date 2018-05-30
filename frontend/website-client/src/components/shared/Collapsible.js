import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    console.log('TTT', 'Collapsible::constructor');
  }

  // static getDerivedStateFromProps(_nextProps, _prevState) {
  //   console.log('TTT', 'Collapsible::getDerivedStateFromProps');
  //   return { open: false };   // Always close the content before display.
  // }

  handleTriggerClick(event) {
    // console.log('TTT', 'Collapsible::handleTriggerClick');
    event.preventDefault();
    // const isOpen = this.state.open;
    // this.setState({open: !this.state.open});
    this.setState(prevState => ({open: !prevState.open}));
  }

  componentDidMount() {
    console.log('TTT', 'Collapsible::componentDidMount');
  }
  componentWillUnmount() {
    console.log('TTT', 'Collapsible::componentWillUnmount');
  }

  render() {
    console.log('TTT', 'Collapsible::render');
    const transition = `height 200ms linear`;
    const height = this.state.open ? this.refs.inner.offsetHeight : 0;
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
        <div className="Collapsible__contentOuter" ref="outer" style={dropdownStyle}>
          <div className="Collapsible__contentInner" ref="inner">
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
