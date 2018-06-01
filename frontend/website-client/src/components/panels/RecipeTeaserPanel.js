import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './recipe-teaser.css';
import Panel from './Panel';
import ImageUtils from './ImageUtils';
import { Link } from 'react-router-dom';

/**
 *
 *  content: {
 *
 *  }
 */
class RecipeTeaserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageStyle: null
    }
  }

  setImage() {
    this.setState({
      backgroundImageStyle: ImageUtils.backgroundImageStyle(
        this.props.content.background_image,
        ImageUtils.placeholderBackgroundImage()
      )
    })
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setImage();
  }

  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = this.state.backgroundImageStyle;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix}>
        <Link to={content.page_link || ''}>
          <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
            <div className={`${classNamePrefix}__info`}>
              <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
            </div>
          </div>
        </Link>
      </Panel>
    );
  }
}

RecipeTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('recipe_teaser', RecipeTeaserPanel, 'recipe-teaser');

export default RecipeTeaserPanel;
