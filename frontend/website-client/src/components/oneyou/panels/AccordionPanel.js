import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
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
    let { id, classNamePrefix, content } = this.props;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
        <div className={`shelf__container container-fluid ${classNamePrefix}__container`}>
          { content.accordions && content.accordions.map((accordion, i) =>
            <AccordionItem key={i}
             id={accordion.id}
             classNamePrefix={'accordion-item'}
             content={accordion.value}
             expanded={this.state.expandedGroup === accordion.id}
             setExpandedGroup={this.setExpandedGroup} />
          )}
        </div>
      </Shelf>
    );
  }
}

AccordionPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('accordion_panel', AccordionPanel, 'accordion-panel');

export default AccordionPanel;
