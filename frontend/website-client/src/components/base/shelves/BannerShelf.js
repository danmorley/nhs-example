import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './promo-shelf.css';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';
import ShelfUtils from '../shared/ShelfUtils';

/**
 *  Banner Shelf is a simple shelf that can be used to display content
 *  from the basic_cta_shelf type Wagtail streamfield.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    field_id: "learn-more-shelf"
 *  }
 * 
 *  Layouts:
 *    image_on_left: 
 */
class BannerShelf extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     backgroundImageStyle: null,
  //     image: null
  //   }
  // }

  // setImage() {
  //   this.setState({
  //     backgroundImageStyle: ImageUtils.backgroundImageStyle(
  //       this.props.content.background_image,
  //       ImageUtils.placeholderBackgroundImage()
  //     ),
  //     image: ImageUtils.isValid(this.props.content.image) ? ImageUtils.deviceImage(this.props.content.image) : null
  //   })
  // }

  // componentDidMount() {
  //   this.setImage();
  //   window.addEventListener('resize', this.setImage.bind(this));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setImage);
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.props = nextProps;
  //   this.setImage();
  // }

  renderImage(image, classname) {
    return (<Image image={image} class={classname} />);
  }

  renderHeadingBody(content, headingTagName) {
    return [
      (<Text key="1" tagName={headingTagName} content={content.heading} />),
      (<Text key="2" content={content.body} format="richtext"/>)
    ];
  }

  renderCta(cta) {
    if (!cta) return null;
    return (<CtaLink variant="button" cta={cta} />);
  }

  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;
    let headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    content = content.panel

    // let shelfStyle = (ImageUtils.isValid(content.background_image)) ?
    // this.state.backgroundImageStyle : backgroundColourShelfStyle;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <ResponsiveBackgroundImage image={content.background_image} className={`shelf__container zzz 
        ${ShelfUtils.shelfContainerClass(content)} child-image--${content.meta_image_display}`}>
          <div className="row">
            <div className="shelf__col col-12 col-vertical-center">
              {this.renderHeadingBody(content, headingTagName)}
              {this.renderCta(content.cta)}
            </div>
          </div>
        </ResponsiveBackgroundImage>
      </Shelf>
    );
  }
}

BannerShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('banner_shelf', BannerShelf, 'banner-shelf', 'banner');

export default BannerShelf;
