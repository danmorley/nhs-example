import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../../base/Text';
import VideoModal from '../../../base/VideoModal';

import ResponsiveBackgroundImage from '../../../base/shared/ResponsiveBackgroundImage';

import './recipe-block.css';


class RecipeBlock extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  triggerModal = () => {
    this.videoRef.current.openModal();
  }

  render() {
    const { recipe } = this.props;

    // Convert recipe passed through to standard format.
    const reformattedImage = {
      title: recipe.recipe_name,
      renditions: recipe.header_image
    }

    const recipeItems = recipe.tags ? recipe.tags.split(',').map((item, i) =>
      <li className="recipe__tags__item" key={i}>{item}</li>
    ) : null;

    const playButtonSvg = require(`!raw-loader!../../../../assets/svg/OneYou-play.svg`);

    let bannerClassNames = 'recipe__banner container';
    let bannerAttr = {};

    if (recipe.video_id) {
      bannerAttr = {
        onClick: this.triggerModal.bind(this)
      }
      bannerClassNames += ' clickable'
    }

    return (
      <div className="recipe">
        {recipe.video_id && <VideoModal video={recipe.video_id} host={recipe.host} ref={this.videoRef}></VideoModal>}
        <div className={bannerClassNames} {...bannerAttr} >
          <ResponsiveBackgroundImage image={reformattedImage}>
            {recipe.header_gradient == true && <div className="gradient"></div>}
            {recipe.video_id && <span className="video_play_button" dangerouslySetInnerHTML={{__html: playButtonSvg}} />}
          </ResponsiveBackgroundImage>
        </div>
        <div className ="recipe__block container">
          <section className="recipe__intro">
            <div className="recipe__intro__col-1">
              <h1 className="recipe__header">
                {recipe.recipe_name}
              </h1>
              <ul className="recipe__tags">
                {recipeItems}
              </ul>
            </div>
            <div className="recipe__intro__col-2">
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
            </div>
          </section>
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
