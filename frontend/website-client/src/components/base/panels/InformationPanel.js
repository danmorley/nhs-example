import React, { Component } from 'react';
import Text from '../../base/Text';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './information-panel.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from '../../base/panels/ImageUtils';
import CtaLinks from '../../base/shared/CtaLinks';

/**
 *  Information panel component displaying a panel in the form of a heading
 *  body, image. *
 *  content: {
 *    heading: 'Walk the walk, talk the talk',
 *    body: 'Share walking stories and your progress with others online',
 *    image: {
 *      title: 'Image name',
 *      link: 'https://blob store url'
 *    }
 *  }
 */
class InformationPanel extends Component {
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
    const { content, classNamePrefix } = this.props;
    const backgroundImage = this.state.backgroundImageStyle;
    const imgDisplay = `image--${content.meta_image_display}`;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant} layout={content.meta_layout}>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h2" content={content.heading} className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
          </div>
          <CtaLinks ctas={content.ctas} variant="button" />
        </div>
        <div className={`${classNamePrefix}__image ${imgDisplay}`} style={backgroundImage}>
        </div>
      </Panel>
    );
  }
}

InformationPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('information_panel', InformationPanel, 'information-panel');

export default InformationPanel;
