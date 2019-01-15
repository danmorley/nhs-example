import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Slider from 'react-slick';
import Equalizer from 'react-equalizer';

// import CtaLinks from '../../base/shared/CtaLinks';

import PlaceholderShelf from './PlaceholderShelf';
// import GeneralTextShelf from './GeneralTextShelf';
// import BasicCtaShelf from './BasicCtaShelf';

import './carousel-shelf.css';

/**
 * Carousel Shelf is used to display a list of slides in a full width carousel widget.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    field_id: "learn-more-shelf"
 *  }
 */
class CarouselShelf extends Component {

  getNodes(equalizerComponent, equalizerElement) {
    return equalizerElement.querySelectorAll(".slick-slide");
  }

  render() {
    let { id, content, classNamePrefix } = this.props;
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: true
    };

    let classNameCarousel = "carousel carousel-full";
    if (content.meta_layout == "panel") {
      classNameCarousel = "panel-carousel carousel-panel";
      settings = Object.assign({
        centerMode: true,
        pauseOnFocus: true,
        centerPadding: '200px',
        autoplay: false,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              centerPadding: '30px'
            }
          },
          {
            breakpoint: 992,
            settings: {
              centerPadding: '80px'
            }
          }
        ]
      }, settings);
    }

    var slides = content.items.map((shelf, _i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfId = shelf.value.field_id || shelf.value.shelf_id || 'shelf-' + shelf.id;
      if (ShelfClass) {
        return (<div key={shelf.id}><ShelfClass content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix} width={content.width}/></div>);
      } else {
        return (<div key={shelf.id}><PlaceholderShelf shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/></div>);
      }
    });


    const containerFluid = (
      <div className="container-fluid">
        <div className="row carousel__row">
          <Equalizer nodes={this.getNodes.bind(this)}>
            <Slider className={classNameCarousel} {...settings}>
              {slides}
            </Slider>
          </Equalizer>
        </div>
      </div>
    );

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          {content.heading && <h2 className="shelf__header">{content.heading}</h2>}
          {content.width != "full" && containerFluid}
        </div>
        {content.width == "full" && containerFluid}
      </Shelf>
    );
  }
}

CarouselShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('carousel_shelf', CarouselShelf, 'carousel-shelf');

export default CarouselShelf;