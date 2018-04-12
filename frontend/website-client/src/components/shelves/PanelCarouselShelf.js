import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Slider from 'react-slick';
import Equalizer from 'react-equalizer';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import VideoTeaserPanel from '../panels/VideoTeaserPanel';
import ImageTeaserPanel from '../panels/ImageTeaserPanel';
import Oneyou1TeaserPanel from '../panels/Oneyou1TeaserPanel';
import AppTeaserPanel from '../panels/AppTeaserPanel';
import InformationPanel from '../panels/InformationPanel';

import styles from './panel-carousel-shelf.css';

/**
 *  Panel Carousel Shelf is used to display a list of slides in a panel carousel widget.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    items: [
 *      { "type": "image_teaser",
 *        "value": {
 *          "heading": "Need Inspiration",
 *          "body": "<p>Then read this text to find out more.<br/></p>",
 *          "image": {
   *          "title": "10msu banner",
 *            "link": "https://campaignstorage.blob.core.windows.net/oneyou-cms-integration/original_images/2f86b9dd5ae29f46db9c66e3c89dfab1.jpg"
 *          },
 *          "meta_variant": "dark-bg",
 *          "cta": [],
 *          "field_id": ""
 *        },
 *        "id": "cd8878f0-ff2b-4442-84b2-24541a2b589f"}
 *    ],
 *    field_id: "learn-more-shelf"
 *  }
 */
class PanelCarouselShelf extends Component {

  getNodes(equalizerComponent, equalizerElement) {
    return equalizerElement.querySelectorAll(".slick-slide");
  }
  
  render() {
    let { id, content, classNamePrefix } = this.props;
    let settings = {
      centerMode: true,
      pauseOnFocus: true,
      slidesToShow: 1,
      centerPadding: '200px', 
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      autoplaySpeed: 12000,
      arrows: true,
      responsive: [ 
        { 
          breakpoint: 576, 
          settings: { 
            centerPadding: '40px'  
          } 
        },
        {
          breakpoint: 992, 
          settings: { 
            centerPadding: '80px'
          }  
        }
      ]
    };
    
    var slides = content.items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.value.field_id || panel.value.panel_id || 'panel-' + panel.id;
      if (PanelClass) {
        return (<div key={i}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      } else {
        return (<div key={i}><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      }
    });

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className="shelf__container container">
          <h2 className="shelf__header">{content.heading}</h2>
        </div>
        <div className="container-fluid">
          <div className="row carousel__row">
            <Equalizer nodes={this.getNodes.bind(this)}>
              <Slider className="panel-carousel carousel-panel" {...settings}>
                  {slides}
              </Slider>
            </Equalizer>
          </div>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('panel_carousel_shelf', PanelCarouselShelf, 'panel-carousel-shelf');

export default PanelCarouselShelf;
