import React, { Component } from 'react';
import Text from '../Text';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './oneyou1-teaser.css';
import Panel from './Panel';
import CtaList from '../shared/CtaList';
import ImageUtils from './ImageUtils';
import PropTypes from 'prop-types';

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
        <div className={`${classNamePrefix}__cta-list`}>
          <CtaList heading="Find out more" items={content.cta} />
        </div>
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
