import React, { Component } from 'react';
import './banner.css';
import PropTypes from 'prop-types';
import ResponsiveBackgroundImage from './ResponsiveBackgroundImage';
import Buttons from './Buttons';

/**
 * Implemenation of a Banner component.
 * 
 * Layouts:
 * 
 * Vertical, Left - All text and buttons are left aligned (vertical_left)
 * Vertical, Center - All text and buttons are aligned centrally (vertical_center)
 * Vertical, Right - All text and buttons are right aligned (vertical_right)
 * 
 * Vertical layout text width should be 50% or 75%. Buttons will be displayed horizontally.
 * 
 * Horizontal, Buttons right - All text is aligned left in the left 75% of the panel, then in the remaining 25%, a single button is 
 * right aligned or multiple buttons are centered.
 * 
 * Horizontal, Buttons centered on right - All text is aligned centrally in the left 75% of the panel, and buttons are centered vertically
 * in the remaining 25%.
 * 
 * Horizontal, Buttons centered on left - Buttons are centered vertically in the left 25% of the panel, then all text is aligned centrally in 
 * the right 75% of the panel.
 * 
 * Horizontal, Buttons left - The left 25% of the panel wil contain a single left aligned button or multiple centered buttons. The right 75% of
 * the panel will hold the left aligned text. 
 * 
 * NOTE: If the standard layouts do not provide the right level of control, use a GridShelf layout with Rich Text and Button Panels. 
 */
class Banner extends Component {
  horizontalButtonsLayout(alignment) {
    return 'horizontal_' + alignment;
  }

  verticalButtonsLayout(alignment, ctasLength) {
    if (ctasLength > 1) {
      alignment = 'center';
    } 

    return 'vertical_' + alignment;
  }

  render() {
    const { backgroundImage, heading, body, ctas, className, layout, ratios, panel } = this.props;

    // Direction: vertical, horizontal
    // Alignment: left, center, right
    const [ direction, alignment ] = layout.split('_');
    // let ratio1 = 'x', ratio2 = 'x';
    // if (direction === 'horizontal') {
    //   [ ratio1, ratio2 ] = ratios.split('_');
    //   // col1 = `col-${ratio1}`;
    //   // col2 = `col-${ratio2}`;
    // }
    // if (direction === 'vertical' && alignment === 'center') {
    //   [ ratio1, ratio2 ] = ratios.split('_');
    //   ratio1 = 'x', ratio2 = 'x';
    // }

    // const variant = backgroundImage && backgroundImage.meta_variant || false;

    // console.log("backgroundImage");
    // console.log(variant);

    // shelf__container-gradient--${gradient}

    // const bannerClass = `banner row no-gutters banner-direction-${direction} banner-align-${alignment} ${className}`;
    const bannerClass = `shelf__container container-fluid shelf__container-gradient--false`;

    let container  = null;

    if (panel) {
      container = (<div className="container">
        <div className="row">
          <div className="shelf__col col-10 col-sm-10 col-md-7">
            {heading}
            {body}
            <Buttons ctas={ctas} layout={this.horizontalButtonsLayout(alignment)} />
          </div>
        </div>
      </div>);
    } else {
      if (direction === 'vertical') {
        container = (<div className="container">
          <div className="row">
            <div className="banner-content">
              <div key="1" className="banner-heading p-1 p-lg-3">
                {heading}
              </div>
              <div key="2" className="banner-body p-1 p-lg-3">
                {body}
              </div>
              <div key="3" className="banner-ctas p-1 p-lg-3">
                <Buttons ctas={ctas} layout={this.horizontalButtonsLayout(alignment)} />
              </div>
            </div>
          </div>
        </div>);
      } else if (direction === 'horizontal') {
        const ctas_container = (<div className="col-12 col-lg-3">
          <Buttons ctas={ctas} layout={this.verticalButtonsLayout(alignment, ctas.length)} />
        </div>);
        const body_container = (<div className="col-12 col-lg-9">
          {heading}
          {body}
        </div>);
        if (alignment === 'left') {
          container = (<div className="row align-items-center">
            {ctas_container}
            {body_container}
          </div>);
        } else {
          container = (<div className="row align-items-center">
            {body_container}
            {ctas_container}
          </div>);
        }
      }
    }

    return (
      <ResponsiveBackgroundImage image={backgroundImage} className={bannerClass}>
        {container}
      </ResponsiveBackgroundImage>
    );
  }
}

Banner.defaultProps = {
  className: '',
  layout: 'horizontal_left',
  ratios: '9_3',
  panel: false
}

Banner.propTypes = {
  backgroundImage: PropTypes.object,
  heading: PropTypes.string,
  body: PropTypes.string,
  ctas: PropTypes.string,
  className: PropTypes.string.isRequired,
  layout: PropTypes.string,
  ratios: PropTypes.string,
  id: PropTypes.string,
  panel: PropTypes.boolean
};

export default Banner;