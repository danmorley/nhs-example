import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUtils from '../panels/ImageUtils';


/**
 *  Utility component to display an HTML element (default 'div') styled with a background
 *  image. Compatible with the CMS ImageBlock field.
 *
 */
class ResponsiveBackgroundImage extends Component {
  handleResize() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { image, variant, className, tagName } = this.props;
    const TagName = tagName;
    const backgroundImageStyle = image ? ImageUtils.backgroundImageStyle(image) : {};
    const imageVariant = variant ? 'image--' + variant : 'image--' + image.meta_variant;
    const imageVariantClass = ImageUtils.isValid(image) ? imageVariant || 'auto' : '';
    const imageSet = ImageUtils.isValid(image) ? 'image-set' : 'image-not-set';

    return (
      <TagName
        className={`background-image ${className} ${imageSet} ${imageVariantClass}`}
        style={backgroundImageStyle}
      >
        {this.props.children}
      </TagName>
    );
  }
}

ResponsiveBackgroundImage.defaultProps = {
  tagName: 'div'
};

ResponsiveBackgroundImage.propTypes = {
  image: PropTypes.object.isRequired,   // API representation of BackgroundImageBlock.
  variant: PropTypes.string,            // Expect 'contain', 'cover', or 'parent'.
  className: PropTypes.string,          // Any other classes to add to the container element.
  tagName: PropTypes.string             // HTML tag for the container element.
};

export default ResponsiveBackgroundImage;
