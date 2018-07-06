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
 *  Page Heading Shelf displays a page header with optional background image,
 *  body text and oreground image
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    meta_layout: "image_bottom_left, image_bottom_right, image_top_right"
 *    image: "an image"
 *  }
 */
 
class PageHeadingShelf extends Component {
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
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;
    let gradient = content.meta_gradient || false;
    let backgroundColourShelfStyle = {};

    let shelfStyle = (ImageUtils.isValid(content.background_image)) ?
      this.state.backgroundImageStyle : backgroundColourShelfStyle;

    let imagePositionStyle = "shelf-image-position--bottom-left";
    
    if (metaLayout === 'image_bottom_right') {
      imagePositionStyle = "shelf-image-position--bottom-right"
    }
    else if (metaLayout === 'image_top_right') {
      imagePositionStyle = "shelf-image-position--top-right"
    }

    let headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className={`shelf__container container-fluid ${imagePositionStyle} shelf__container-gradient--${gradient}`} style={shelfStyle}>
          <div className="container">
            <div className="row">
              <div className="shelf__col col-10 col-sm-8 col-md-7">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
            </div>
            {this.renderImage(content.image, `${classNamePrefix}__image`)}
          </div>
        </div>
      </Shelf>
    );
  }
}

PageHeadingShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('page_heading_shelf', PageHeadingShelf, 'page-heading-shelf', 'home-page');

export default PageHeadingShelf;
