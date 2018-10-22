import React, { Component } from 'react';
import './teaser.css';
import PropTypes from 'prop-types';
import ResponsiveBackgroundImage from './ResponsiveBackgroundImage';

class Teaser extends Component {
  render() {
    const { image, imagePanelText, heading, body, ctas, className, layout } = this.props;
    const teaserClass = `teaser row no-gutters ${className}`;
    const [ col1, col2 ] = layout.split('_');

    return (
      <div className={teaserClass}>
        <ResponsiveBackgroundImage image={image} className={`teaser-image col-12 col-md-${col1}`}>
-          {imagePanelText}
        </ResponsiveBackgroundImage>
        <div className={`col-12 col-md-${col2}`}>
          <div className="teaser-body">
            <div className="teaser-heading p-1 p-lg-3">
              {heading}
            </div>
            <div className="teaser-text p-1 p-lg-3">
              {body}
            </div>
            <div className="teaser-ctas p-1 p-lg-3">
              {ctas}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Teaser.defaultProps = {
  className: '',
  layout: '4_8'
}

Teaser.propTypes = {
  image: PropTypes.object.isRequired,
  imagePanelText: PropTypes.string,
  heading: PropTypes.string,
  body: PropTypes.string,
  ctas: PropTypes.string,
  className: PropTypes.string.isRequired,
  layout: PropTypes.string,
  id: PropTypes.string
};

export default Teaser;
