import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUtils from '../panels/ImageUtils';


/**
 *  Utility component to display an HTML element (default 'div') styled with a background
 *  image. Compatible with the CMS ImageBlock field.
 *
 */
class ResponsiveBackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = { backgroundImageStyle: null };
  }

  setImage() {
    const { image } = this.props;
    if (image && image.image) {
      const style = ImageUtils.backgroundImageStyle(this.props.image.image, ImageUtils.placeholderBackgroundImage());
      this.setState({ backgroundImageStyle: style });
    }
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  // Code below was commented out as it isn't needed now that all components are keyed on their
  // unique id passwed in from Wagtail.

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.props = nextProps;
  //   this.setImage();
  // }

  render() {
    const { image, variant, className, tagName } = this.props;
    const TagName = tagName;
    let imageVariant = null, imageSet = null;

    if (image && image.image) {
      imageVariant = ImageUtils.isValid(image.image) ? variant || 'image--' + image.meta_variant || 'auto' : '';
      imageSet = ImageUtils.isValid(image.image) ? 'image-set' : 'image-not-set';
    }

    return (
      <TagName
        className={`${className} ${imageSet} ${imageVariant}`}
        style={this.state.backgroundImageStyle}
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
  image: PropTypes.object.isRequired,   // API representation of ImageBlock.
  variant: PropTypes.string,            // Expect 'contain', 'cover', or 'parent'.
  className: PropTypes.string,          // Any other classes to add to the container element.
  tagName: PropTypes.string             // HTML tag for the container element.
};

export default ResponsiveBackgroundImage;
