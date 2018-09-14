import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors, removeHash } from 'react-scrollable-anchor';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import MultiPanelBlock from '../pages/blocks/MultiPanelBlock';
import './accordion-shelf.css';

configureAnchors({offset: -100})

class AccordionShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      hash: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const hash = '#' + this.props.content.heading.toLowerCase().replace(' ', '_')
    this.setState({hash: hash})
  }

  handleClick() {
    if (this.state.expanded) {
      console.log('removing hash', this.state.hash)
      removeHash();
      console.log(window.location.hash);
      this.setState({expanded: false});
    } else {
      console.log('adding hash', this.state.hash);
      window.location.hash = this.state.hash;
    }
  }

  checkIfExpanded() {
    console.log('running check on ' + this.state.hash, window.location.hash);
    if (this.state.hash === window.location.hash && !this.state.expanded) {
      console.log('check', window.location.hash);
      this.setState({expanded: true});

    } else if (this.state.hash !== window.location.hash && this.state.expanded) {
      this.setState({expanded: false});
    }
  }

  render() {
    this.checkIfExpanded();
    let { id, classNamePrefix, content } = this.props;
    let shelf_id = this.props.content.heading.toLowerCase().replace(' ', '_');
    let expansionClassName = this.state.expanded ? 'expanded' : 'collapsed';

    return (
      <ScrollableAnchor id={shelf_id}>
        <Shelf id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
          <div className={`shelf__container container`}>
            <h2 onClick={this.handleClick}>
              {content.heading}
            </h2>

            <div className={expansionClassName}>
              { MultiPanelBlock.renderItems(content.items, '', 'div') }
            </div>
          </div>
        </Shelf>
      </ScrollableAnchor>
    );
  }
}

AccordionShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('accordion_shelf', AccordionShelf, 'accordion-shelf');

export default AccordionShelf;
