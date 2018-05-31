import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../Text';
import Image from '../../Image';
import ImageUtils from '../../panels/ImageUtils';
import './recipe-block.css';


class RecipeBlock extends Component {
  render() {
    const { recipe } = this.props;

    // Convert recipe passed through to standard format.
    const reformattedImage = {
      title: recipe.recipe_name,
      renditions: recipe.image
    }

    const deviceImage = ImageUtils.deviceImage(reformattedImage);
    
    const recipeTags = recipe.tags.split(',');
    const recipeItems = recipeTags.map((item, i) =>
      <li className="recipe__tags__item" key={i}>{item}</li>
    );

    return (
      <div className ="recipe-block container">
        <div>
          <Image image={deviceImage} />
          <h2 className="recipe__header">
            {recipe.recipe_name}
          </h2>

          <ul className="recipe__tags">
            {recipeItems}
          </ul>

          <div className="recipe__summary">
            <div className="recipe__summary__item">
              <div className="recipe__summary__header recipe__summary__plate">
              </div>
              <p>
                Serves {recipe.serves}
              </p>
            </div>
            <div className="recipe__summary__item">
              <div className="recipe__summary__header">
                {recipe.preparation_time}
              </div>
              <p>
                Mins
              </p>
            </div>
            <div className="recipe__summary__item">
              <div className="recipe__summary__header">
                {recipe.difficulty}
              </div>
              <p>
                Difficulty
              </p>
            </div>
          </div>

          <h2 className="recipe__header">
            Ingredients
          </h2>
          <Text tagName="div" content={recipe.ingredients_list} className="recipe__ingredients" format="richtext" />

          <h2 className="recipe__header">
            Instructions
          </h2>

          <Text tagName="div" content={recipe.instructions} className="recipe__instructions" format="richtext" />
        </div>
      </div>
    );
  }
}

RecipeBlock.propTypes = {
  recipe: PropTypes.object.isRequired
}

export default RecipeBlock;
