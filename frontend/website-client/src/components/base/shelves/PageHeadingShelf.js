import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import Text from '../../base/Text';
import Image from '../../base/Image';
import CtaLink from '../../base/shared/CtaLink';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import '../../base/shelves/promo-shelf.css';
import ImageUtils from '../../base/panels/ImageUtils';
import ResponsiveImage from '../shared/ResponsiveImage';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';
import ImageTeaserPanel from '../../oneyou/panels/ImageTeaserPanel';

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
    // this.state = {
    //   backgroundImageStyle: null
    // }
  }

  // setImage() {
  //   this.setState({
  //     backgroundImageStyle: ImageUtils.backgroundImageStyle(
  //       this.props.content.background_image,
  //       ImageUtils.placeholderBackgroundImage()
  //     ),
  //     firstImage: ImageUtils.isValid(this.props.content.image_left) ? ImageUtils.deviceImage(this.props.content.image_left) : null,
  //     secondImage: ImageUtils.isValid(this.props.content.image_right) ? ImageUtils.deviceImage(this.props.content.image_right) : null
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

  // renderImage1(image, classname) {
  //   return (<Image image={image} class={classname} />);
  // }
  
  // renderImage2(image, classname) {
  //   return (<Image image={image} class={classname} />);
  // }

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
    const { id, content, classNamePrefix, variant } = this.props;
    const metaVariant = content.meta_variant || variant;
    // let firstImageLayout = content.image_left ?  content.image_left.layout : '';
    // let secondImageLayout = content.image_right ? content.image_right.layout : '';
    const gradient = content.meta_gradient || false;
    // // let backgroundColourShelfStyle = {};

    // // let shelfStyle = (ImageUtils.isValid(content.background_image)) ?
    // //   this.state.backgroundImageStyle : backgroundColourShelfStyle;

    // console.log('PAGEHEADING', content.image_left);
    // let firstLogoStyle = "left-image--top";
    // let secondLogoStyle = "right-image--bottom";
    
    // if (firstImageLayout === 'bottom') {
    //   firstLogoStyle = "left-image--bottom"
    // }
    
    // if (secondImageLayout === 'top') {
    //   secondLogoStyle = "right-image--top"
    // }
    
    const headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';
    const leftImage = ImageUtils.isValid(content.image_left) ? ImageUtils.deviceImage(content.image_left) : null;
    const rightImage = ImageUtils.isValid(content.image_right) ? ImageUtils.deviceImage(content.image_right) : null;

    // Calculate styling to position the left and right images 
    const leftImageStyle = (content.image_left && content.image_left.meta_position === 'bottom')? 'left-image--bottom' : 'left-image--top';
    const rightImageStyle = (content.image_right && content.image_right.meta_position === 'bottom')? 'right-image--bottom' : 'right-image--top';
    
    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group}>
        <ResponsiveBackgroundImage image={content.background_image} className={`shelf__container container shelf-${leftImageStyle} shelf-${rightImageStyle} shelf__container-gradient--${gradient}`}
        >
          <div className="container">
            <div className={`${classNamePrefix}__container-left`}>
              <div className="row">
                <div className="shelf__col col-10 col-sm-8 col-md-7">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                </div>
              </div>
              { leftImage &&
                <div className={`${classNamePrefix}__${leftImageStyle}`}>
                  <ResponsiveImage image={leftImage} className={`${classNamePrefix}__image`} />
                </div> 
              }  
            </div>  
            <div className={`${classNamePrefix}__container-right`}>
              { rightImage &&
                <div className={`${classNamePrefix}__${rightImageStyle}`}>
                  <ResponsiveImage image={rightImage} className={`${classNamePrefix}__image`} />
                </div>
              }
            </div>      
          </div>
        </ResponsiveBackgroundImage>
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
