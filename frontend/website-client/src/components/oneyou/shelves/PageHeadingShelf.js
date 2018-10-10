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
      backgroundImageStyle: null
    }
  }

  setImage() {
    this.setState({
      backgroundImageStyle: ImageUtils.backgroundImageStyle(
        this.props.content.background_image,
        ImageUtils.placeholderBackgroundImage()
      ),
      firstImage: ImageUtils.isValid(this.props.content.image_left) ? ImageUtils.deviceImage(this.props.content.image_left) : null,
      secondImage: ImageUtils.isValid(this.props.content.image_right) ? ImageUtils.deviceImage(this.props.content.image_right) : null
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

  renderImage1(image, classname) {
    return (<Image image={image} class={classname} />);
  }
  
  renderImage2(image, classname) {
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
    let { id, content, classNamePrefix, variant } = this.props;
    let metaVariant = content.meta_variant || variant;
    let firstImageLayout = content.image_left ?  content.image_left.layout : '';
    let secondImageLayout = content.image_right ? content.image_right.layout : '';
    let gradient = content.meta_gradient || false;
    let backgroundColourShelfStyle = {};

    let shelfStyle = (ImageUtils.isValid(content.background_image)) ?
      this.state.backgroundImageStyle : backgroundColourShelfStyle;

    let firstLogoStyle = "left-image--top";
    let secondLogoStyle = "right-image--bottom";
    
    if (firstImageLayout === 'bottom') {
      firstLogoStyle = "left-image--bottom"
    }
    
    if (secondImageLayout === 'top') {
      secondLogoStyle = "right-image--top"
    }

    let headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <div className={`shelf__container container-fluid shelf-${firstLogoStyle} shelf-${secondLogoStyle} shelf__container-gradient--${gradient}`} style={shelfStyle}>
          <div className="container">
            <div className={`${classNamePrefix}__container-left`}>
              <div className="row">
                <div className="shelf__col col-10 col-sm-8 col-md-7">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                </div>
              </div>
              { this.state.firstImage &&
                <div className={`${classNamePrefix}__${firstLogoStyle}`}>
                  {this.renderImage1(content.image_left, `${classNamePrefix}__image`)}
                </div> 
              }  
            </div>  
            <div className={`${classNamePrefix}__container-right`}>
              { this.state.secondImage &&
                <div className={`${classNamePrefix}__${secondLogoStyle}`}>
                  {this.renderImage2(content.image_right, `${classNamePrefix}__image`)}
                </div>
              }
            </div>      
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
  firstImageLayout: PropTypes.string,
  secondImageLayout: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('page_heading_shelf', PageHeadingShelf, 'page-heading-shelf', 'home-page');

export default PageHeadingShelf;
