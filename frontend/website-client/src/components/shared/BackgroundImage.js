import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUtils from '../panels/ImageUtils';


/**
 *  Utility component to display an HTML element (default 'div') styled with a background
 *  image. Compatible with the CMS ImageBlock field.
 *
 */
class BackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = { backgroundImageStyle: null };
  }

  setImage() {
    const style = ImageUtils.backgroundImageStyle(this.props.image.image, ImageUtils.placeholderBackgroundImage());
    this.setState({ backgroundImageStyle: style });
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
    const imageVariant = variant || image.meta_rendition_key || 'auto';

    return (
      <TagName
        className={`${className} image--${imageVariant}`}
        style={this.state.backgroundImageStyle}
      >
        {this.props.children}
      </TagName>
    );
  }
}

BackgroundImage.defaultProps = {
  tagName: 'div'
};

BackgroundImage.propTypes = {
  image: PropTypes.object.isRequired,   // API representation of ImageBlock.
  variant: PropTypes.string.isRequired, // Expect 'contain', 'cover',or 'parent'.
  className: PropTypes.string,          // Any other classes to add to the container element.
  tagName: PropTypes.string             // HTML tag for the container element.
};

export default BackgroundImage;
