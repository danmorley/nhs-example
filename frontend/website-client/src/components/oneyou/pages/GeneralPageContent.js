import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import MultiShelfBlock from './blocks/MultiShelfBlock';

class GeneralPageContent extends Component {
  render() {
    let { page } = this.props;
    return <MultiShelfBlock body={page.body} />;
  }
}

GeneralPageContent.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

CmsComponentRegistry.register('oneyou_page', GeneralPageContent, 'oneyou-general');

export default GeneralPageContent;
