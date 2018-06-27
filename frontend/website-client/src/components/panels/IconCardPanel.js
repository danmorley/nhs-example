import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './icon-card-panel.css';
import Panel from './Panel';
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setImage();
  }

  render() {
    const { content, classNamePrefix, variant, layout } = this.props;
    const metaVariant = content.meta_variant || variant;
    const metaLayout = content.meta_layout || layout;
    let html;

    if (metaLayout === 'icon_on_left' || metaLayout === 'icon_on_right') {
      html = this.renderLayoutsIconOnLeftOrRight(content, classNamePrefix, metaLayout);
    } else {
      html = <p>Layout {metaLayout} not supported</p>;
    }

    return (
      <Panel id={content.panel_id || this.props.id}
        classNamePrefix={classNamePrefix}
        variant={metaVariant}
        layout={metaLayout}>
        {html}
      </Panel>
    );
  }

  renderLayoutsIconOnLeftOrRight(content, classNamePrefix, layout) {
    const flexRowReverse = (layout === 'icon_on_left') ? '' : 'flex-row-reverse';

    return (
      <div className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
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
    )
  }
}

IconCardPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.object,
  layout: PropTypes.object,
  id: PropTypes.object
};

CmsComponentRegistry.register('icon_card_panel', IconCardPanel, 'icon-card-panel');

export default IconCardPanel;
