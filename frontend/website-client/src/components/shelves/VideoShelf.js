import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import CtaLink from '../CtaLink';
import ShelfRegistry from './ShelfRegistry';
import styles from './video-teaser.css'
import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image
import testImage from '../../assets/images/Trump2.jpg';

/**

 *
 *  content: {
 *
 *  }
 */
class VideoShelf extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let metaLayout = content.meta_layout || '';

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
    };
    
    let backgroundTeaserImage = {
      backgroundImage: 'url(' + testImage + ')',
    };

    let backgroundColourShelfStyle = {
    };
    
    let videoPanel = (
      <div className="video-teaser">
        
        <div className="video-teaser__image" style = {backgroundTeaserImage}>
          {/* // needs alt text */} 
        </div>
      
        <div className="video-teaser__info">
          <div className="video-teaser__heading">
            <Text tagName="h3" content={content.heading} />
          </div>
          <div className="video-teaser__text">
            <Text content={content.body} />
            <CtaLink link={content.cta_link}>{content.cta_link_label}</CtaLink>
          </div>
        </div>
      </div>
    );
    
    let textPanel = [
      (<Text tagName="h2" content={content.heading} />),
      (<Text content={content.body} />),
      (<CtaLink link={content.cta_link}>{content.cta_link_label}</CtaLink>)
    ];
    
    let shelfStyle = (content.background_image) ? backgroundImageShelfStyle : backgroundColourShelfStyle;

    return (
      <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix}>
        <div className="shelf__container container" style={shelfStyle}>
          <div className="row">
            <div className="shelf__col col-sm-12 col-md-6">
              {videoPanel}
            </div>
            <div className="shelf__col col-sm-12 col-md-6">
              {videoPanel}
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

ShelfRegistry.register('video_shelf', VideoShelf, 'video');

export default VideoShelf;
