import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUtils from '../../base/panels/ImageUtils';
import Image from '../../base/Image';

/**
 *  Utility component to display an image element (default 'div')
 *
 */
class ResponsiveImage extends Component {
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
