import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import AccordionPanel from '../panels/AccordionPanel';


class AccordionGroup extends Component {
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
        <div className={`shelf__container container`}>
          { content.accordions && content.accordions.map((accordion, i) =>
            <AccordionPanel key={i}
             id={accordion.id}
             classNamePrefix={accordion.type}
             content={accordion.value}
             expanded={this.state.expandedGroup === accordion.id}
             setExpandedGroup={this.setExpandedGroup} />
          )}
        </div>
      </Shelf>
    );
  }
}

AccordionGroup.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('accordion_group', AccordionGroup, 'accordion-group');

export default AccordionGroup;
