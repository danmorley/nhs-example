import React, { Component } from 'react';
import Text from '../Text';
import CtaLinks from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './image-teaser.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from '../panels/ImageUtils';

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
    let desktopLayout = content.meta_layout_desktop ? content.meta_layout_desktop : 'desktop-image-default';
    let mobilLayout = content.meta_layout_mobile ? content.meta_layout_mobile : 'mobile-image-default';
    // let layout = content.meta_layout_desktop + '-' + content.meta_layout_mobile;
    // let layout = content.meta_layout;
    let ctaStyle = content.meta_cta_variant;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant} layout={content.meta_layout}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
        </div>
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
            <CtaLinks ctas={content.ctas} variant={ctaStyle} />
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

CmsComponentRegistry.register('image_teaser_panel', ImageTeaserPanel, 'image-teaser', null, null);

export default ImageTeaserPanel;
