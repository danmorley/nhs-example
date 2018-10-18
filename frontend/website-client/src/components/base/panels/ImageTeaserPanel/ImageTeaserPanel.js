import React, { Component } from 'react';
import Text from '../../../base/Text';
import CtaLinks from '../../../base/shared/CtaLinks';
import CmsComponentRegistry from '../../../base/CmsComponentRegistry';
import './image-teaser-panel.css';
import Panel from '../Panel';
import PropTypes from 'prop-types';
import ResponsiveBackgroundImage from '../../shared/ResponsiveBackgroundImage';

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
    const { content, classNamePrefix } = this.props;
    const layout = content.meta_layout;
    // const layout = content.meta_layout_desktop + '-' + content.meta_layout_mobile;
    const ctaStyle = content.meta_cta_variant;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant} layout={layout}>
        <ResponsiveBackgroundImage image={content.image} className={`${classNamePrefix}__image`}></ResponsiveBackgroundImage>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
            { content.audio &&
              <audio
                  id={`${content.panel_id}-audio`}
                  controls
                  src={`${content.audio}`}>
                  Your browser does not support the <code>audio</code> element.
              </audio>
            }
            <CtaLinks cta={content.ctas} variant={ctaStyle} />
          </div>
        </div>
      </Panel>
    );
  }
}

ImageTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('image_teaser', ImageTeaserPanel, 'image-teaser');

export default ImageTeaserPanel;
