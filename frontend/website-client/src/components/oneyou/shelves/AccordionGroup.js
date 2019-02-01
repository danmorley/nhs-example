import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../base/shelves/Panel';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import AccordionItem from '../panels/AccordionItem';


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
      <Panel id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
        <div className={`shelf__container container-fluid ${classNamePrefix}__container`}>
          { content.accordions && content.accordions.map((accordion, i) =>
            <AccordionItem key={i}
              id={accordion.id}
              classNamePrefix={'accordion-item'}
              content={accordion.value}
              container={classNamePrefix}
              expanded={this.state.expandedGroup === accordion.id}
              setExpandedGroup={this.setExpandedGroup} />
          )}
        </div>
      </Panel>
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
