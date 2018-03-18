import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './grid-shelf.css';
import ShowMorePanel from '../shared/ShowMorePanel';

import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image
// import testImage from '../../assets/images/Trump2.jpg';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import VideoTeaserPanel from '../panels/VideoTeaserPanel';
import ImageTeaserPanel from '../panels/ImageTeaserPanel';
import Oneyou1TeaserPanel from '../panels/Oneyou1TeaserPanel';
import AppTeaserPanel from '../panels/AppTeaserPanel';
import InformationPanel from '../panels/InformationPanel';

/**
 *  Grid Shelf is a simple shelf that can be used to display other
 *  components in a grid.
 *
 *  It expects the following Layouts:
 *
 *  responsive_2_col
 *  full_width
 */
class GridShelf extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = { isGridExpanded: false };
  //   this.doExpand = this.doExpand.bind(this);
  //   this.doContract = this.doContract.bind(this);
  //   this.storageKey = `${this.props.id}_panelExpanded`;
  // }
  //
  // componentDidMount() {
  //   // Load expanded state from session storage.
  //   const isGridExpanded = sessionStorage.getItem(this.storageKey) === 'Y';
  //   this.setState({ isGridExpanded: isGridExpanded });
  // }
  //
  // componentWillUnmount() {
  //   // Save expanded state to session storage.
  //   sessionStorage.setItem(this.storageKey, this.state.isGridExpanded ? 'Y' : 'N');
  // }
  //
  // doExpand() {
  //   this.gridContainerElem.style.transitionDuration = '1s';
  //   this.gridContainerElem.style.maxHeight = `${this.gridContentHeight}px`;
  //   // this.gridContainerElem.style.maxHeight = this.panelWrapperHeight(); // Using this delays transition start until after timeout.
  //
  //   // Allow time for the transition to complete before setting the state and re-rendering.
  //   setTimeout(() => {
  //     this.setState({ isGridExpanded: true });
  //   }, 1200);
  // }
  //
  // doContract() {
  //   this.gridContainerElem.style.maxHeight = `${this.childPanelHeight}px`;
  //   // this.gridContainerElem.style.maxHeight = this.panelWrapperHeight(); // Using this delays transition start until after timeout.
  //
  //   // Allow time for the transition to complete before setting the state and re-rendering.
  //   setTimeout(() => {
  //     this.setState({ isGridExpanded: false });
  //   }, 1200);
  // }
  //
  recordChildHeight(elem, index, rowsToShow) {
    if (index === 0 && elem) this.childPanelHeight = elem.clientHeight * rowsToShow;
    console.log('child height is', this.childPanelHeight);
  }
  //
  // setGridContainerElem(elem) {
  //   this.gridContainerElem = elem;
  // }
  //
  // setGridContentHeight(elem) {
  //   if (elem) this.gridContentHeight = elem.clientHeight;
  // }
  //
  // panelWrapperHeight(rowsToShow) {
  //   if (rowsToShow === 0) return 'auto';
  //   return this.state.isGridExpanded ? `${this.gridContainerHeight}px` : `${this.childPanelHeight}px`;
  // }

  render() {
    let { id, content, classNamePrefix, layout, variant } = this.props;
    let metaLayout = content.meta_layout || layout;
    let panelClass = (metaLayout === 'full_width') ? 'shelf__col col-sm-12' : 'shelf__col col-sm-12 col-md-6';

    var panels = content.items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.value.field_id || panel.id;
      if (PanelClass) {
        // return (<div key={i} ref={props.inputRef} className={panelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
        // return (<div key={i} ref={(elem) => this.recordChildHeight(elem, i, content.rows_to_show)} className={panelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
        return (<div key={i} className={panelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      } else {
        return (<div key={i} className={panelClass}><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      }
    });

    // const shouldShowMoreLessButton = content.rows_to_show > 0 && this.gridContainerElem && this.gridContainerElem.clientHeight < this.gridContentHeight;

    console.log('before return - child height is', this.childPanelHeight);
    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className="shelf__container container">
          <h2 className="shelf__header">{content.heading}</h2>
          <ShowMorePanel rowsToShow={content.rows_to_show} panels={panels} />
        </div>
      </Shelf>
    );
  }
}

GridShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.string,
  variant: PropTypes.string
};

CmsComponentRegistry.register('grid_shelf', GridShelf, 'basic-grid-shelf', null, 'responsive_2_col');

export default GridShelf;
