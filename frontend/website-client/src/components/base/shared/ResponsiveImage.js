import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUtils from '../../base/panels/ImageUtils';
import Image from '../../base/Image';

/**
 *  Utility component to display an image element (default 'div')
 *
 */
class ResponsiveImage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { backgroundImageStyle: null };
  // }

  // setImage() {
  //   const { image } = this.props;
  //   if (image && image.image) {
  //     const style = ImageUtils.backgroundImageStyle(this.props.image.image, ImageUtils.placeholderBackgroundImage());
  //     this.setState({ backgroundImageStyle: style });
  //   }
  // }

  handleResize() {
    this.forceUpdate();
  }

  componentDidMount() {
    // this.setImage();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Code below was commented out as it isn't needed now that all components are keyed on their
  // unique id passwed in from Wagtail.

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.props = nextProps;
  //   this.setImage();
  // }

  render() {
    const { image, variant, className } = this.props;
    const deviceImage = ImageUtils.isValid(image) ? ImageUtils.deviceImage(image) : null

    return (
      <Image image={deviceImage} className={className} />
    );
  }
}

ResponsiveImage.propTypes = {
  image: PropTypes.object.isRequired,   // API representation of ImageBlock.
  variant: PropTypes.string,            // Expect 'contain', 'cover', or 'parent'.
  className: PropTypes.string           // Any other classes to add to the container element.
};

export default ResponsiveImage;
