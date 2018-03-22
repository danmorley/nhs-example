import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './show-more-panel.css';
import classNames from 'classnames';

/**
 *  Show More Panel.
 *
 *  It expects the following Layouts:
 *
 *  responsive_2_col
 *  full_width
 */
class ShowMorePanel extends Component {
  constructor (props) {
    super(props);
    this.state = { isExpanded: false, childrenToView: 1 };
    this.doExpand = this.doExpand.bind(this);
    this.doContract = this.doContract.bind(this);
    this.storageKey = `${this.props.id}_panelExpanded`;
  }

  componentDidMount() {
    // Load expanded state from session storage.
    const isExpanded = sessionStorage.getItem(this.storageKey) === 'Y';
    this.setState({ isExpanded: isExpanded, childrenToView: this.childrenToView(isExpanded) });
  }

  componentWillUnmount() {
    // Save expanded state to session storage.
    sessionStorage.setItem(this.storageKey, this.state.isExpanded ? 'Y' : 'N');
  }

  doExpand() {
    this.setState({ isExpanded: true, childrenToView: this.childrenToView(true) });
  }

  doContract() {
    this.setState({ isExpanded: false, childrenToView: this.childrenToView(false) });
  }

  setContainerElem(elem) {
    // console.log('Container elem is', elem);
    this.containerElem = elem;
  }

  setContentElem(elem) {
    // console.log('Content elem is', elem);
    this.contentElem = elem;
  }

  childrenToView(isExpanded) {
    let { rowsToShow, children } = this.props;

    if (isExpanded || rowsToShow === 0) {
      console.log('childrenToView', children.length);
      return children.length;  // Display all children.

    } else {
      if (this.contentElem) {
        const childElems = this.contentElem.children;
        const firstChild = childElems[0];
        const width = firstChild.clientWidth;
        const availableWidth = this.contentElem.clientWidth * rowsToShow;
        let childrenToView = availableWidth / width;
        if (childrenToView > children.length) childrenToView = children.length;
        console.log('Calculated children to view is', childrenToView);
        return childrenToView;

      } else {
        console.log('childrenToView', 1);
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

  firstChildDimensions() {
    const childElems = this.contentElem.children;

  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, i) => {
      if (i < this.state.childrenToView) return child;

      // Return a hidden child.
      const classes = child.props.className;
      return React.cloneElement(child, {
        className: classNames(classes, 'hidden')
      });
    })
  }

  render() {
    let { rowsToShow, childRowHeight, children } = this.props;

    const container =
      <div key="1" ref={(elem) => this.setContainerElem (elem)} className="show-more-panel">
        <div ref={elem => this.setContentElem(elem)} className="row show-more-content">
          {this.renderChildren()}
        </div>
      </div>
    ;

    const buttons = (this.shouldShowMoreLessButton() &&
      <div key="2" className="row" style={{justifyContent: 'center'}}>
        {this.state.isExpanded ? (
          <a onClick={this.doContract}>See less</a>
        ) : (
          <a onClick={this.doExpand}>See more</a>
        )}
      </div>
    );

    // const info =
    //   <div key="3" className="debug-info">
    //     Rows to show: {rowsToShow}, Children: {children.length}, To view: {this.state.childrenToView}, Collapsed capacity: {this.childrenToView(false)}
    //   </div>
    // ;

    return [
      container,
      buttons
    ];
  }
}

ShowMorePanel.propTypes = {
  rowsToShow: PropTypes.number.isRequired,
};

export default ShowMorePanel;
