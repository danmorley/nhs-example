import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './promo-shelf.css';
import ImageUtils from '../panels/ImageUtils';

/**
 *  Basic CTA Shelf is a simple shelf that can be used to display content
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
 */
class BasicCtaShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageStyle: null,
      image: null
    }
  }

  setImage() {
    this.setState({
      backgroundImageStyle: ImageUtils.backgroundImageStyle(
        this.props.content.background_image,
        ImageUtils.placeholderBackgroundImage()
      ),
      image: ImageUtils.isValid(this.props.content.image) ? ImageUtils.deviceImage(this.props.content.image) : null
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
    if (content.promo) {
      // Cater for shared content within a shelf.
      //
      // NOTE: Temporary solution until promo_panel (v1) can be removed.
      content.heading = content.promo.heading;
      content.shelf_id = content.promo.shelf_id;
      content.meta_variant = content.promo.meta_variant;
      content.meta_layout = content.promo.meta_layout;
      content.cta = content.promo.cta;
    }

    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;
    let gradient = content.meta_gradient || false;
    let backgroundColourShelfStyle = {};

    let shelfStyle = (ImageUtils.isValid(content.background_image)) ?
      this.state.backgroundImageStyle : backgroundColourShelfStyle;

    let headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';

    if (metaLayout === 'image_on_left') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col">
                {this.renderImage(this.state.image)}
              </div>
              <div className="shelf__col col">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'image_on_right') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
              <div className="shelf__col col">
                {this.renderImage(this.state.image)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'cta_on_left') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col col-vertical-center col-shrink-to-fit">
                {this.renderCta(content.cta)}
              </div>
              <div className="shelf__col col col-vertical-center md-content-right">
                {this.renderHeadingBody(content, headingTagName)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'cta_on_right') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col col-vertical-center">
                {this.renderHeadingBody(content, headingTagName)}
              </div>
              <div className="shelf__col col col-vertical-center md-content-right col-shrink-to-fit">
                {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'full_width') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className={`shelf__container container-fluid shelf__container-gradient--${gradient}`}  style={shelfStyle}>
            <div className="container">
              <div className="row">
                <div className="shelf__col col-10 col-sm-10 col-md-7">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                </div>
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'full_to_half_width') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} layout={metaLayout} trackingGroup={content.tracking_group}>
          <div className="container full-to-half-width">
            <div className="shelf__container container" style={shelfStyle}>
              <div className="row">
                <div className="shelf__col col col-vertical-center">
                  {this.renderHeadingBody(content, headingTagName)}
                </div>
                <div className="shelf__col col col-vertical-center md-content-right">
                  {this.renderCta(content.cta)}
                </div>
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'section_heading') {
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="col shelf__col">
                {this.renderHeadingBody(content, headingTagName)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else {
      // Default layout: ???
      return (
        <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col-12 col-vertical-center">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    }
  }
}

BasicCtaShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

// Basic CTA Shelf
//
// Layouts: image_on_left, image_on_right, full_width
// Variants:
CmsComponentRegistry.register('basic_cta_shelf', BasicCtaShelf, 'basic-cta-shelf');

// Banner Shelf
//
// Layouts: cta_on_right, cta_on_left
// Variants: banner
CmsComponentRegistry.register('banner_shelf', BasicCtaShelf, 'banner-shelf', 'banner');

// Promo Shelf
//
// Layouts: cta_on_right, cta_on_left
// Variants: promo
CmsComponentRegistry.register('promo_shelf', BasicCtaShelf, 'promo-shelf', 'promo');
CmsComponentRegistry.register('promo_shelf_v2', BasicCtaShelf, 'promo-shelf', 'promo');

export default BasicCtaShelf;
