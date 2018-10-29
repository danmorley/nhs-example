import React, { Component } from 'react';
import './cc-teaser.css';
import PropTypes from 'prop-types';
import ResponsiveBackgroundImage from '../shared/ResponsiveBackgroundImage';

class CcTeaser extends Component {
  render() {
    const { image, imagePanelText, heading, body, ctas, className, layout } = this.props;
    const teaserClass = `cc-teaser container-fluid h-100 ${className}`;
    // const [ col1, col2 ] = layout.split('_');

    return (
      <div className={teaserClass}>
        <div className="row">
          <ResponsiveBackgroundImage image={image} className="cc-teaser-image col-12 d-md-none py-5">
  -          {imagePanelText}
          </ResponsiveBackgroundImage>
        </div>
        <div className="row">
          <ResponsiveBackgroundImage image={image} className="cc-teaser-image d-none d-md-block col-md-4">
  -          {imagePanelText}
          </ResponsiveBackgroundImage>
          <div className="cc-teaser-body col-12 col-md-8 p-0">
            <div className="d-flex align-items-end flex-column h-100">
              <div className="cc-teaser-heading w-100">
                {heading}
              </div>
              <div className="cc-teaser-text w-100">
                {body}
              </div>
              <div className="cc-teaser-ctas w-100 mt-auto">
                {ctas}
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

CcTeaser.defaultProps = {
  className: '',
  layout: '4_8'
}

CcTeaser.propTypes = {
  image: PropTypes.object.isRequired,
  imagePanelText: PropTypes.string,
  heading: PropTypes.string,
  body: PropTypes.string,
  ctas: PropTypes.string,
  className: PropTypes.string.isRequired,
  layout: PropTypes.string,
  id: PropTypes.string
};

export default CcTeaser;
