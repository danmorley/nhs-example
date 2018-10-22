import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../base/Text';
import CtaLink from '../../base/shared/CtaLinks';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './app-teaser.css';
import Panel from './Panel';
import ImageUtils from '../../base/panels/ImageUtils';

/**
 *
 *  content: {
 *
 *  }
 */
class AppTeaserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageStyle: null
    }
  }

  setImage() {
    this.setState({
      backgroundImageStyle: ImageUtils.backgroundImageStyle(
        this.props.content.image,
        ImageUtils.placeholderBackgroundImage()
      )
    })
  }

  componentDidMount() {
    this.setImage();
    window.addEventListener('resize', this.setImage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImage);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setImage();
  }

  render() {
    let { content, classNamePrefix } = this.props;
    let backgroundTeaserImage = this.state.backgroundImageStyle;

    // Set button text for accessibility and tracking.
    if (content.cta_appstore) {
      content.cta_appstore.link_text = 'Download from the Appstore';
    }
    if (content.cta_googleplay) {
      content.cta_googleplay.link_text = 'Get it on Google Play';
    }

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
            { (content.cta_appstore || content.cta_googleplay) &&
              <ul className={`${classNamePrefix}__app-button-list`}>
                <li>
                  <CtaLink cta={content.cta_appstore} variant="appstore" dataName={`appstore-${content.heading}`} /> 
                </li>
                <li>
                  <CtaLink cta={content.cta_googleplay} variant="googleplay" dataName={`googleplay-${content.heading}`} />
                </li>
              </ul>
            }
            { content.cta.link_text &&
              <ul className={`${classNamePrefix}__button-list`}>
                <li>
                  <CtaLink cta={content.cta} variant="button" />
                </li>
              </ul>
            }
          </div>
        </div>
      </Panel>
    );
  }
}

AppTeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('app_teaser', AppTeaserPanel, 'app-teaser');

export default AppTeaserPanel;