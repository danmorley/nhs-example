import React, { Component } from 'react';

class Image extends Component {

  render() {
    let { image } = this.props;
    if (!image) return null;

    return [
       image && (<img src={image.image} alt={image.title} {...this.props} />)
    ];
  }
}

export default Image;
