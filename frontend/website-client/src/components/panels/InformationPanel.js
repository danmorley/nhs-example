import React, { Component } from 'react';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './information-panel.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from './ImageUtils';
import CtaLinks from '../shared/CtaLinks';

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
      backgroundImageStyle: ImageUtils.backgroundImageStyle(this.props.content.image,
                                                            ImageUtils.placeholderBackgroundImage())
    })
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundImage = this.state.backgroundImageStyle;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h2" content={content.heading} className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
          </div>
          <CtaLinks cta={content.cta} variant='button' />
        </div>
        <div className={`${classNamePrefix}__image`} style={backgroundImage}>
        </div>
      </Panel>
    );
  }
}

InformationPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('information_panel', InformationPanel, 'information-panel');

export default InformationPanel;
