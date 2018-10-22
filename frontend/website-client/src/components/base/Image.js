import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 *  Primitive component to display an image with an alt tag.
 *
 *  image: {
 *    link: 'http://path-to-image/glass-of-wine.jpg',
 *    title: 'Glass of Wine'
 *  }
 */
class Image extends Component {
  render() {
    let { image, ...rest } = this.props;
    if (!image) return null;

    return (
      <img src={image.link} alt={image.title} className={image.class} {...rest} />
    );
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  variant: PropTypes.string
};

export default Image;
