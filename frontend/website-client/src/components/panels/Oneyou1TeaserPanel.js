import React, { Component } from 'react';
import Text from '../Text';
import CtaLinks from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './oneyou1-teaser.css';
import Panel from './Panel';
import CtaList from '../shared/CtaList';
import ImageUtils from './ImageUtils';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

// import sampleBgImage from '../shelves/healthcheckup.png'; // Tell Webpack this JS file uses this image
// import testImage from '../../assets/images/Trump2.jpg';

/**
 *
 *  content: {
 *
 *  }
 */
class Oneyou1TeaserPanel extends Component {
  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = ImageUtils.backgroundImageStyle(content.image, ImageUtils.placeholderImage());

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <Text tagName="h3" content={content.heading} className={`${classNamePrefix}__heading`} />
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__text`}>
          <Text content={content.body} className={`${classNamePrefix}__body`}/>
          <CtaLink link={content.cta} />
        </div>
        { (content.cta instanceof Array) ? (
          <div className={`${classNamePrefix}__cta-list`}>
            <Collapsible trigger={<h4>{content.cta_heading || 'Find out more'}</h4>} transitionTime={200}>
              <CtaList items={content.cta} />
            </Collapsible>
          </div>
        ) : (
          <div className={`${classNamePrefix}__cta-item`}>
            <CtaLink cta={content.cta} />
          </div>
        )}
      </Panel>
    );
  }
}

Oneyou1TeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('oneyou1_teaser', Oneyou1TeaserPanel, 'oneyou1-teaser');

export default Oneyou1TeaserPanel;
