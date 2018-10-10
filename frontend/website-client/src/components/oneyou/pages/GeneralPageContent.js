import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../CmsComponentRegistry';
import MultiShelfBlock from './blocks/MultiShelfBlock';

class RecipePageContent extends Component {
  render() {
    let { page } = this.props;
    return <MultiShelfBlock body={page.body} />;
  }
}

RecipePageContent.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

CmsComponentRegistry.register('general_page', RecipePageContent, 'general-page');
CmsComponentRegistry.register('oneyou_page', RecipePageContent, 'general-page');

export default RecipePageContent;
