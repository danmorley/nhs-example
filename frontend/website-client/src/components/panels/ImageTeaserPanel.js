import React, { Component } from 'react';
import Text from '../Text';
import CtaLinks from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './image-teaser.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from './ImageUtils';
import Image from '../Image';

/**
 *  Image Teaser panel component displaying a teaser panel in the form of a heading
 *  body, image and call to action buttons.
 *
 *  Note the the cta key may be either a single cta object or a list of cta objects.
 *
 *  content: {
 *    heading: 'Walk the walk, talk the talk',
 *    body: 'Share walking stories and your progress with others online',
 *    image: {
 *      title: 'Image name',
 *      link: 'https://blob store url'
 *    },
 *    cta: {
 *      link_text: 'Find out more',
 *      link_external: 'http://www.somewebsite.co.uk'
 *    }
 *  }
 */
class ImageTeaserPanel extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = ImageUtils.backgroundImageStyle(content.image, ImageUtils.placeholderImage());

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="html"/>
            <CtaLinks cta={content.cta} />
          </div>
        </div>
      </Panel>
    );
  }
}

ImageTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('image_teaser', ImageTeaserPanel, 'image-teaser');

export default ImageTeaserPanel;
