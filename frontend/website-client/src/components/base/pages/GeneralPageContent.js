import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../CmsComponentRegistry';
import MultiShelfBlock from '../blocks/MultiShelfBlock';

class GeneralPageContent extends Component {
  render() {
    const { page } = this.props;
    const context = { page: page }
    return <MultiShelfBlock body={page.body} context={context}/>;
  }
}

GeneralPageContent.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

CmsComponentRegistry.register('general_page', GeneralPageContent, 'general');

export default GeneralPageContent;
