import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import CtaLink from '../CtaLink';
import ShelfRegistry from './ShelfRegistry';
import styles from './shelves.css';



import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image

/**
 *  Basic CTA Shelf is a simple shelf that can be used to display content
 *  from the basic_cta_shelf type Wagtail streamfield.
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
class BasicCtaShelf extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let metaLayout = content.meta_layout || 'image_on_right';

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
    };

    let backgroundColourShelfStyle = {
      backgroundColor: 'blue',
      padding: '2em'
    };

    let textPanel = [
      (<Text tagName="h2" content={content.heading} />),
      (<Text content={content.body} />),
      (<CtaLink link={content.cta_button_link}>{content.cta_button_label}</CtaLink>)
    ];
    
    let textOnlyPanel = [
      (<Text tagName="h2" content={content.heading} />),
      (<Text content={content.body} />)
    ];
    
    let ctaPanel = [
      (<CtaLink link={content.cta_button_link}>{content.cta_button_label}</CtaLink>)
    ];
    
    let shelfStyle = (content.background_image) ? backgroundImageShelfStyle : backgroundColourShelfStyle;

    let imagePanel = (
      <img alt="roger"/>
    );
    
    let mainBannerPannel = [
      (<Text tagName="h2" content={content.heading} />),
      (<Text content={content.body} />),
      (<CtaLink link={content.cta_button_link}>{content.cta_button_label}</CtaLink>)
    ];

    if (metaLayout === 'image_on_left') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix}>
          <div className="container" style={shelfStyle}>
            <div className="row">
              {imagePanel}{textPanel}
            </div>
          </div>
        </Shelf>
      );
    } else if  (metaLayout === 'image_on_right') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
          <div className="container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col">
                {textPanel}
              </div>
              <div className="shelf__col col">
                {imagePanel}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if  (metaLayout === 'cta_on_right') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
          <div className="container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col align-center">
                {textOnlyPanel}
              </div>
              <div className="shelf__col col md-content-right">
                {ctaPanel}
              </div>
            </div>
          </div>
        </Shelf>
      );
    }
    else { //full_wwidth
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
          <div className="container-fluid" style={shelfStyle}>  
            <div className="row">
              <div className="shelf__col col-10 col-sm-8">
                {mainBannerPannel}
              </div>
            </div>
          </div>
        </Shelf>
      );
    }
  }
}

ShelfRegistry.register('basic_cta_shelf', BasicCtaShelf, 'basic-cta');
ShelfRegistry.register('promo_shelf', BasicCtaShelf, 'promo');

export default BasicCtaShelf;
