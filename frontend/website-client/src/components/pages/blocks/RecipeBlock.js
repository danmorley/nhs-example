import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../Text';


class RecipeBlock extends Component {
  render() {
    let { recipe } = this.props;

    return (
      <div className="recipe">
        <div>
          <h1>Recipe</h1>
          <p>Page title: {recipe.title}</p>
          <p>Recipe name: {recipe.recipe_name}</p>
          <p>Tags: {recipe.tags}</p>
          <p>Serves: {recipe.serves}</p>
          <p>Prep: {recipe.preparation_time}</p>
          <p>Difficulty: {recipe.difficulty}</p>
          <p>Ingredients:</p>
          <Text tagName="div" content={recipe.ingredients_list} className="ingredients" format="richtext" />
          <p>Instructions:</p>
          <Text tagName="div" content={recipe.instructions} className="instructions" format="richtext" />
        </div>
      </div>
    );
  }
}

RecipeBlock.propTypes = {
  recipe: PropTypes.object.isRequired
}

export default RecipeBlock;
