import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../../base/shelves/Shelf';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import Slider from 'react-slick';
import Equalizer from 'react-equalizer';

import PlaceholderShelf from '../../base/shelves/PlaceholderShelf';
import GeneralTextShelf from './GeneralTextShelf';
import BasicCtaShelf from './BasicCtaShelf';

import './main-carousel-shelf.css';

/**
 *  Main Carousel Shelf is used to display a list of slides in a full width carousel widget.
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
class MainCarouselShelf extends Component {

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

    var slides = content.items.map((shelf, _i) => {
      const shelfInfo = CmsComponentRegistry.components[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfId = shelf.value.field_id || shelf.value.shelf_id || 'shelf-' + shelf.id;
      if (ShelfClass) {
        return (<div key={shelf.id}><ShelfClass content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix}/></div>);
      } else {
        return (<div key={shelf.id}><PlaceholderShelf shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/></div>);
      }
    });

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          {content.heading && <h2 className="shelf__header">{content.heading}</h2>}
        </div>
        <div className="container-fluid">
          <div className="row carousel__row">
            <Equalizer nodes={this.getNodes.bind(this)}>
              <Slider className="carousel carousel-full" {...settings}>
                {slides}
              </Slider>
            </Equalizer>
          </div>
        </div>
      </Shelf>
    );
  }
}

MainCarouselShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('main_carousel_shelf', MainCarouselShelf, 'carousel-shelf');
CmsComponentRegistry.register('carousel_shelf', MainCarouselShelf, 'carousel-shelf');

export default MainCarouselShelf;
