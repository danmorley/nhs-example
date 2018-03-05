import React, { Component } from 'react';
import Text from '../Text';
import CtaLink from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './app-teaser.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import ImageUtils from './ImageUtils';

/**
 *
 *  content: {
 *
 *  }
 */
class AppTeaserPanel extends Component {
  // backgroundImageUrl(image, defaultImage) {
  //   return (image && image.link) || defaultImage.link;
  // }
  //
  // backgroundImageStyle(image, defaultImage) {
  //   return {
  //     backgroundImage: 'url(' + ImageUtils.backgroundImageUrl(image, ImageUtils.placeholderImage) + ')'
  //   }
  // }

  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = ImageUtils.backgroundImageStyle(content.image, ImageUtils.placeholderBackgroundImage());

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`}/>
            <ul className="panel__button-list">
              <li>
                <CtaLink cta={content.cta_appstore} variant="appstore"/>
              </li>
              <li>
                <CtaLink cta={content.cta_googleplay} variant="googleplay"/>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
    );
  }
}

AppTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
};

CmsComponentRegistry.register('app_teaser', AppTeaserPanel, 'app-teaser');

export default AppTeaserPanel;
