import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  render() {
    let { image, ...rest } = this.props;
    if (!image) return null;

    return (
      <img src={image.link} alt={image.title} {...rest} />
    );
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  variant: PropTypes.string
};

export default Image;
