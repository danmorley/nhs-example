import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shelf from './Shelf';
import Text from '../Text';
import CtaLink from '../CtaLink';
import ShelfRegistry from './ShelfRegistry';
import styles from './shelves.css';
// import { Carousel } from 'react-responsive-carousel';
// import Carousel from 'nuka-carousel';
import Slider from 'react-slick';

import PlaceholderShelf from './PlaceholderShelf';
import GeneralTextShelf from './GeneralTextShelf';
import BasicCtaShelf from './BasicCtaShelf';

/**
 *  Carousel Shelf is used to display a list of slides in a carousel widget.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    shelf_id: "learn-more-shelf"
 *  }
 */
class CarouselShelf extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
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

    var slides = content.items.map((shelf, i) => {
      const shelfInfo = ShelfRegistry.shelves[shelf.type];
      const ShelfClass = shelfInfo && shelfInfo.class;
      const shelfClassNamePrefix = shelfInfo && shelfInfo.classNamePrefix;
      const shelfId = shelf.shelf_id || shelf.id;
      if (ShelfClass) {
        return (<div><ShelfClass key={i} content={shelf.value} id={shelfId} classNamePrefix={shelfClassNamePrefix}/></div>);
      } else {
        return (<div><PlaceholderShelf key={i} shelfType={shelf.type} id={shelfId} classNamePrefix={shelfClassNamePrefix}/></div>);
      }
    });

    return (
      <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix}>
        <div className="container">
          <div className="row">
            <Slider {...settings}>
              {slides}
            </Slider>
          </div>
        </div>
      </Shelf>
    );
  }
}

// ReactDOM.render(<CarouselShelf />, document.querySelector('.carousel-shelf'));

ShelfRegistry.register('carousel_shelf', CarouselShelf, 'carousel');

export default CarouselShelf;
