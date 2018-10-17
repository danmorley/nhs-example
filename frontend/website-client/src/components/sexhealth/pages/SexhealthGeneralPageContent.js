import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import MultiShelfBlock from '../../base/blocks/MultiShelfBlock';

class SexhealthGeneralPageContent extends Component {
  render() {
    let { page } = this.props;
    return <MultiShelfBlock body={page.body} />;
  }
}

SexhealthGeneralPageContent.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

CmsComponentRegistry.register('sexhealth_page', SexhealthGeneralPageContent, 'sexhealth-general');

export default SexhealthGeneralPageContent;
