import React, { Component } from 'react';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './icon-card-panel.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from './ImageUtils';
import Image from '../Image';

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
class IconCardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconImage: null
    }
  }

  setImage() {
    this.setState({
      iconImage: ImageUtils.imageUrl(this.props.content.image, ImageUtils.placeholderBackgroundImage())
    })
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setImage();
  }

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id}
             classNamePrefix={classNamePrefix}
             variant={content.meta_variant}
             layout={content.meta_layout}>
        <div className={`${classNamePrefix}__wrapper row justify-content-start no-gutters`}>
          {this.state.iconImage && <div className={`${classNamePrefix}__image`}>
            <Image image={{link: this.state.iconImage, title: content.image.title}} />
          </div>}
          <div className={`${classNamePrefix}__body`}>
            <Text tagName="h2" content={content.heading} className={`${classNamePrefix}__heading`} />
            <div className={`${classNamePrefix}__text`}>
              <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

IconCardPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('icon_card_panel', IconCardPanel, 'icon-card-panel');

export default IconCardPanel;
