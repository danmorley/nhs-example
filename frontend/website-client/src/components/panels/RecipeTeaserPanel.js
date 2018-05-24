import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CtaLink from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './app-teaser.css';
import Panel from './Panel';
import ImageUtils from './ImageUtils';

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
        this.props.content.image,
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
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
        </div>
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
