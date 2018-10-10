import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './icon-card-panel.css';
import Panel from './Panel';
import ImageUtils from './ImageUtils';
import Image from '../Image';
import CtaLinks from '../shared/CtaLinks';

/**
 *  IconCard panel component displaying a panel in the form of a heading
 *  body, and image image.
 *
 *  content: {
 *    heading: 'Walk the walk, talk the talk',
 *    body: 'Share walking stories and your progress with others online',
 *    image: {
 *      title: 'Image name',
 *      renditions: {}
 *    },
 *    meta_variant: 'standard_grey_bg',
 *    meta_layout: 'icon_on_left',
 *  }
 *
 *  Supported layouts:
 *
 *  icon_on_left
 *  icon_on_right
 *  icon_on_top
 *  icon_on_bottom
 *  icon_heading_left
 *  icon_heading_right
 *  icon_body_left
 *  icon_body_right
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

    switch (metaLayout) {
    case 'icon_on_left':
      html = this.renderLayout_IconOnLeftOrRight(content, classNamePrefix, 'left');
      break;

    case 'icon_on_right':
      html = this.renderLayout_IconOnLeftOrRight(content, classNamePrefix, 'right');
      break;

    case 'icon_on_top':
      html = this.renderLayout_IconOnTop(content, classNamePrefix);
      break;

    case 'icon_on_bottom':
      html = this.renderLayout_IconOnBottom(content, classNamePrefix);
      break;

    case 'icon_heading_left':
      html = this.renderLayout_IconHeadingLeftOrRight(content, classNamePrefix, 'left');
      break;

    case 'icon_heading_right':
      html = this.renderLayout_IconHeadingLeftOrRight(content, classNamePrefix, 'right');
      break;

    case 'icon_body_left':
      html = this.renderLayout_IconBodyLeftOrRight(content, classNamePrefix, 'left');
      break;

    case 'icon_body_right':
      html = this.renderLayout_IconBodyLeftOrRight(content, classNamePrefix, 'right');
      break;

    default:
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

  renderLayout_IconOnLeftOrRight(content, classNamePrefix, alignment) {
    const flexRowReverse = (alignment === 'right') ? 'flex-row-reverse' : '';

    return (
      <div className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
        {this.state.iconImage && <div className={`col ${classNamePrefix}__image`}>
          {this.renderImage(content, classNamePrefix)}
        </div>}
        <div className={`col-auto ${classNamePrefix}__body`}>
          {this.renderHeading(content, classNamePrefix)}
          {this.renderBodyText(content, classNamePrefix)}
        </div>
      </div>
    );
  }

  renderLayout_IconOnTop(content, classNamePrefix) {
    return [
      <div key="1" className="row justify-content-center no-gutters">
        {this.state.iconImage && <div className={`col-12 ${classNamePrefix}__image`}>
          {this.renderImage(content, classNamePrefix)}
        </div>}
      </div>,
      <div key="2" className="row justify-content-center no-gutters">
        <div className={`col-12 ${classNamePrefix}__body`}>
          {this.renderHeading(content, classNamePrefix)}
          {this.renderBodyText(content, classNamePrefix)}
        </div>
      </div>
    ];
  }

  renderLayout_IconOnBottom(content, classNamePrefix) {
    return this.renderLayout_IconOnTop(content, classNamePrefix).reverse();
  }

  renderLayout_IconHeadingLeftOrRight(content, classNamePrefix, alignment) {
    const flexRowReverse = (alignment === 'right') ? 'flex-row-reverse' : '';

    return [
      <div key="1" className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
        {this.state.iconImage && <div className={`col-md-3 ${classNamePrefix}__image`}>
          {this.renderImage(content, classNamePrefix)}
        </div>}
        <div className={`col-md-9 ${classNamePrefix}__body`}>
          {this.renderHeading(content, classNamePrefix)}
        </div>
      </div>,
      <div key="2" className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
        {this.state.iconImage && <div className={`col-md-3 ${classNamePrefix}__image`}></div>}
        <div className={`col-md-9 ${classNamePrefix}__body`}>
          {this.renderBodyText(content, classNamePrefix)}
        </div>
      </div>
    ];
  }

  renderLayout_IconBodyLeftOrRight(content, classNamePrefix, alignment) {
    const flexRowReverse = (alignment === 'right') ? 'flex-row-reverse' : '';

    return [
      <div key="1" className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
        {this.state.iconImage && <div className={`col-md-3 ${classNamePrefix}__image`}>{this.transparentImage()}</div>}
        <div className={`col-md-9 ${classNamePrefix}__body`}>
          {this.renderHeading(content, classNamePrefix)}
        </div>
      </div>,
      <div key="2" className={`${classNamePrefix}__wrapper row justify-content-start no-gutters ${flexRowReverse}`}>
        {this.state.iconImage && <div className={`col-md-3 ${classNamePrefix}__image`}>
          {this.renderImage(content, classNamePrefix)}
        </div>}
        <div className={`col-md-9 ${classNamePrefix}__body`}>
          {this.renderBodyText(content, classNamePrefix)}
        </div>
      </div>
    ];
  }

  renderImage(content) {
    return (
      <Image image={{link: this.state.iconImage, title: content.image.title}} className="img-fluid"/>
    );
  }

  renderHeading(content, classNamePrefix) {
    return (
      <Text tagName="h3" content={content.heading} className={`${classNamePrefix}__heading`} />
    );
  }

  renderBodyText(content, classNamePrefix) {
    return (
      <div className={`${classNamePrefix}__text`}>
        <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
        <CtaLinks cta={content.cta} variant="button" />
      </div>
    );
  }

  transparentImage() {
    return (
      <Image image={ImageUtils.transparentImage()} className="img-fluid"/>
    );
  }
}

IconCardPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
};

CmsComponentRegistry.register('icon_card_panel', IconCardPanel, 'icon-card-panel');

export default IconCardPanel;
