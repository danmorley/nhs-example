import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './show-more-panel.css';
import { CSSTransitionGroup } from 'react-transition-group';
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
    // let containerHeight = 'auto';
    // if (!isExpanded) {
    //   containerHeight = this.firstChildHeight();
    // }
    this.setState({ isExpanded: isExpanded, childrenToView: this.childrenToView(isExpanded) });
  }

  // firstChildHeight() {
  //   console.log('1111');
  //   let containerHeight = 'auto';
  //   const firstChildElem = this.contentElem.firstElementChild;
  //   containerHeight = firstChildElem.clientHeight;
  //
  //   console.log('2222');
  //
  //   return containerHeight;
  // }

  // lastChildOffsetX() {
  //   console.log('1111');
  //   const lastChildElem = this.contentElem.lastElementChild;
  //   debugger;
  //   const lastChildOffset = lastChildElem.clientHeight;
  //
  //   console.log('2222', lastChildElem);
  //
  //   return lastChildOffset;
  // }

  componentWillUnmount() {
    // Save expanded state to session storage.
    sessionStorage.setItem(this.storageKey, this.state.isExpanded ? 'Y' : 'N');
  }

  doExpand() {
    this.setState({ isExpanded: true, childrenToView: this.childrenToView(true) });

    // this.gridContainerElem.style.maxHeight = this.panelWrapperHeight(); // Using this delays transition start until after timeout.

    // Allow time for the transition to complete before setting the state and re-rendering.
    // setTimeout(() => {
    //   this.contentElem.style.transitionDuration = '1s';
    //   this.contentElem.style.maxHeight = '800px'; //`${this.contentElem.clientHeight}px`; //`${this.gridContentHeight}px`;
    // }, 500);
  }

  doContract() {
    // const firstChildHeight = firstChildHeight();
    // this.containerElem.style.maxHeight = this.firstChildHeight; //`${this.childPanelHeight}px`;
    // this.gridContainerElem.style.maxHeight = this.panelWrapperHeight(); // Using this delays transition start until after timeout.

    // Allow time for the transition to complete before setting the state and re-rendering.
    // setTimeout(() => {
    this.setState({ isExpanded: false, childrenToView: this.childrenToView(false) });

    // }, 1);
  }

  // recordChildHeight(elem, index, rowsToShow) {
  //   if (index === 1 && elem) this.childPanelHeight = elem.clientHeight * rowsToShow;
  // }

  setContainerElem(elem) {
    console.log('Container elem is', elem);
    this.containerElem = elem;
  }

  setContentElem(elem) {
    console.log('Content elem is', elem);
    this.contentElem = elem;
  }

  componentDidUpdate() {
    console.log('in componentDidUpdate', this.contentElem);
    // if (this.contentElem) {
    //   const firstChildElem = this.contentElem.firstElementChild;
    //   if (this.state.containerHeight !== firstChildElem.clientHeight) {
    //     this.setState({ containerHeight: `${firstChildElem.clientHeight}px` });
    //   }
    // }
  }

  // setGridContentHeight(elem) {
  //   if (elem) this.gridContentHeight = elem.clientHeight;
  // }
  // contractedPanelHeight() {
  //   return `${this.props.childRowHeight}px`;
  // }

  // containerPanelHeight() {
  //   const { rowsToShow } = this.props;
  //   if (rowsToShow === 0) return 'auto';
  //   return this.state.isExpanded ? `${this.contentElem.clientHeight}px` : this.contractedPanelHeight(); //`${this.gridContainerHeight}px` : `${this.childPanelHeight}px`;
  // }

  childrenToView(isExpanded) {
    let { panels, rowsToShow } = this.props;

    if (isExpanded || rowsToShow === 0) {
      console.log('childrenToView', panels.length);
      return panels.length;  // Display all children.
    } else {
      // const childrenToView = words.filter(word => word.length > 6);
      // debugger;
      if (this.contentElem) {
        const childElems = this.contentElem.children;
        const firstChild = childElems[0];
        const width = firstChild.clientWidth;
        const availableWidth = this.contentElem.clientWidth * rowsToShow;
        let childrenToView = availableWidth / width;
        if (childrenToView > panels.length) childrenToView = panels.length;
        console.log('Calculated children to view is', childrenToView);
        return childrenToView;

      } else {
        console.log('childrenToView', 1);
        return 1;
      }
    }
  }

  shouldShowMoreLessButton() {
    let { panels, rowsToShow } = this.props;
    if (rowsToShow === 0) return false;

    const noOfChildrenWhenCollapsed = this.childrenToView(false);
    return panels.length > noOfChildrenWhenCollapsed;
  }

  firstChildDimensions() {
    const childElems = this.contentElem.children;

  }

  render() {
    let { rowsToShow, childRowHeight, panels } = this.props;

    // const shouldShowMoreLessButton = content.rows_to_show > 0 && this.gridContainerElem && this.gridContainerElem.clientHeight < this.gridContentHeight;
    const container =
      <div key="1" ref={(elem) => this.setContainerElem (elem)} className="show-more-panel">
        <div ref={elem => this.setContentElem(elem)} className="row show-more-content">
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {panels.slice(0, this.childrenToView(this.state.isExpanded))}
          </CSSTransitionGroup>
        </div>
      </div>
    ;

    const showShowButtons = this.shouldShowMoreLessButton();
    const buttons = (showShowButtons &&
      <div key="2" className="row" style={{justifyContent: 'center'}}>
        {this.state.isExpanded ? (
          <a onClick={this.doContract}>See less</a>
        ) : (
          <a onClick={this.doExpand}>See more</a>
        )}
      </div>
    );

    const info =
      <div key="3">
        Rows to show: {rowsToShow}, Children: {panels.length}, To view: {this.state.childrenToView}, Collapsed capacity: {this.childrenToView(false)}
      </div>
    ;

    return [
      container,
      buttons,
      info
    ];
  }
}

ShowMorePanel.propTypes = {
  rowsToShow: PropTypes.number.isRequired,
  childRowHeight: PropTypes.number.isRequired
};

export default ShowMorePanel;
