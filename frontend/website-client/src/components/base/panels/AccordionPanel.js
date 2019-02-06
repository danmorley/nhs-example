import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../base/panels/Panel';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import AccordionItem from '../panels/AccordionItem';


class AccordionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedGroup: null
    }
    this.setExpandedGroup = this.setExpandedGroup.bind(this);
  }

  setExpandedGroup(id) {
    this.setState({ expandedGroup: id });
  }

  render() {
    let { id, classNamePrefix, content, scrollItemsToTopWhenSelected } = this.props;
    scrollItemsToTopWhenSelected = scrollItemsToTopWhenSelected || content.scroll_items_to_top_when_selected || false;

    return (
      <Panel id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
        <ul className={`shelf__container ${classNamePrefix}__container`}>
          { content.accordions && content.accordions.map((accordion, i) =>
            <AccordionItem key={i}
              id={accordion.id}
              classNamePrefix={'accordion-item'}
              content={accordion.value}
              container={classNamePrefix}
              expanded={this.state.expandedGroup === accordion.id}
              setExpandedGroup={this.setExpandedGroup}
              scrollToTopWhenSelected={scrollItemsToTopWhenSelected} />
          )}
        </ul>
      </Panel>
    );
  }
}

AccordionPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  scrollItemsToTopWhenSelected: PropTypes.bool,
  id: PropTypes.string
};

CmsComponentRegistry.register('accordion_panel', AccordionPanel, 'accordion-group');

export default AccordionPanel;
