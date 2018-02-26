import React, { Component } from 'react';

class Image extends Component {

  render() {
    let { image } = this.props;
    if (!image) return null;

    return (
      <div>{ image && (<img src={image.image} alt={image.title} {...this.props} />) }</div>
    );
  }
}

export default Image;
