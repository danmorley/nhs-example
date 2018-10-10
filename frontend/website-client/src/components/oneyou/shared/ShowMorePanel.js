import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './show-more-panel.css';
import classNames from 'classnames';

/**
 *  Show More Panel.
 *
 *  Second improved show more panel that automatically refreshes when the window is resized.
 *
 *  Also, it doesn't need to retain the number of chidren to show in state and it uses React
 *  16.3 refs.
 *
 */
class ShowMorePanel extends Component {
  constructor (props) {
    super(props);
    this.state = { isExpanded: false };
    this.doExpand = this.doExpand.bind(this);
    this.doContract = this.doContract.bind(this);
    this.storageKey = `${props.id}_panelExpanded`;
    this.containerElem = React.createRef();
    this.contentElem = React.createRef();
  }

  handleResize() {
    this.forceUpdate();
  }

  componentDidMount() {
    // Load expanded state from session storage.
    const isExpanded = sessionStorage.getItem(this.storageKey) === 'Y';
    this.setState({ isExpanded: isExpanded });
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  doExpand() {
    this.setState({ isExpanded: true });
    // Save expanded state to session storage.
    sessionStorage.setItem(this.storageKey, 'Y');

  }

  doContract() {
    this.setState({ isExpanded: false });
    // Save expanded state to session storage.
    sessionStorage.setItem(this.storageKey, 'N');
  }

  childrenToView(isExpanded) {
    const { rowsToShow, children } = this.props;

    if (isExpanded || rowsToShow === 0) {
      return children.length;  // Display all children.

    } else {
      if (this.contentElem.current) {
        if (this.contentElem.current.childElementCount === 0) return 0; // No children to display.

        // Get client width of first child.
        const childElems = this.contentElem.current.children;
        const firstChild = childElems[0];
        const width = firstChild.clientWidth;

        // Get client width of content container.
        const availableWidth = this.contentElem.current.clientWidth * rowsToShow;

        // Calculate the number of children to show.
        let childrenToView = availableWidth / width;
        if (childrenToView > children.length) childrenToView = children.length;
        return childrenToView;

      } else {
        return 1;
      }
    }
  }

  shouldShowMoreLessButton() {
    let { rowsToShow, children } = this.props;
    if (rowsToShow === 0) return false;
    const noOfChildrenWhenCollapsed = this.childrenToView(false);
    return children.length > noOfChildrenWhenCollapsed;
  }

  renderChildren(childrenToView) {
    return React.Children.map(this.props.children, (child, i) => {
      if (i < childrenToView) return child;

      // Return a hidden child.
      const classes = child.props.className;
      return React.cloneElement(child, {
        className: classNames(classes, 'hidden')
      });
    })
  }

  render() {
    const childrenToView = this.childrenToView(this.state.isExpanded);
    console.log('SMP.render:', 'displaying', childrenToView, 'of', this.props.children.length, 'child panels');

    const container =
      <div key="1" ref={this.containerElem} className="show-more-panel">
        <div ref={this.contentElem} className="row show-more-content">
          {this.renderChildren(childrenToView)}
        </div>
      </div>
    ;

    const buttons = (this.shouldShowMoreLessButton() &&
      <div key="2" className="row more-less-toggle" style={{justifyContent: 'center'}}>
        {this.state.isExpanded ? (
          <a onClick={this.doContract} className="see-less">See less</a>
        ) : (
          <a onClick={this.doExpand} className="see-more">See more</a>
        )}
      </div>
    );

    return [
      container,
      buttons
    ];
  }
}

ShowMorePanel.propTypes = {
  rowsToShow: PropTypes.number.isRequired,
  childRowHeight: PropTypes.number,
  id: PropTypes.string.isRequired
};

export default ShowMorePanel;
