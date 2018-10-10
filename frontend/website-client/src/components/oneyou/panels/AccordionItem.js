import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';
import CmsComponentRegistry from '../CmsComponentRegistry';
import MultiPanelBlock from '../pages/blocks/MultiPanelBlock';
import './accordion-item.css';


class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const hash = '#' + this.props.content.shelf_id;
    if (hash === window.location.hash && !this.state.expanded) {
      this.props.setExpandedGroup(this.props.id);
      this.removeHash();
    }
  }

  componentDidUpdate() {
    // importing package here to get round server-side bug that causes test to fail
    const scrollToComponent = require('react-scroll-to-component');

    const pageHeaderElem = document.querySelector('.page-header');
    const offset = (pageHeaderElem)? pageHeaderElem.clientHeight + 5 : 0;

    if (this.props.expanded) {
      scrollToComponent(this.Accordion, { offset: -offset, align: 'top', duration: 500, ease:'inCirc'});
    }
  }

  removeHash() {
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    )
  }

  handleClick() {
    if (this.props.expanded) {
      this.props.setExpandedGroup(null);
    } else {
      this.props.setExpandedGroup(this.props.id);
    }
  }

  render() {
    let { id, classNamePrefix, content } = this.props;
    let expansionClassName = this.props.expanded ? 'expanded' : 'collapsed';

    return (
      <Panel id={content.shelf_id} classNamePrefix={classNamePrefix}>
        <div ref={ (div) => { this.Accordion = div; } }>
          <div className={`${classNamePrefix}__header ${classNamePrefix}__header--${expansionClassName}`}>
            <h2 onClick={this.handleClick} className={`container ${classNamePrefix}__sub-container`}>
              {content.heading}
            </h2>
          </div>
          <div className={`${classNamePrefix}__body ${classNamePrefix}__body--${expansionClassName} container ${classNamePrefix}__sub-container`}>
            { MultiPanelBlock.renderItems(content.items, '', 'div') }
          </div>
        </div>
      </Panel>
    );
  }
}

AccordionItem.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  setExpandedGroup: PropTypes.func.isRequired
};

CmsComponentRegistry.register('accordion_item', AccordionItem, 'accordion-item');

export default AccordionItem;
