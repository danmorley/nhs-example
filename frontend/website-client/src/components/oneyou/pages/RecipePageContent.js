import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/page.css';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import RecipeBlock from './blocks/RecipeBlock';

class RecipePageContent extends Component {
  render() {
    let { page } = this.props;

    return [
      <RecipeBlock key="1" recipe={page} />
    ];
  }
}

RecipePageContent.propTypes = {
  site: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

CmsComponentRegistry.register('recipe_page', RecipePageContent, 'oneyou-recipe');

export default RecipePageContent;
