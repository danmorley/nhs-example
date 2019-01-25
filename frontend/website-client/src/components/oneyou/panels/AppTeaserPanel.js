import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../base/Text';
import CtaLink from '../../base/shared/CtaLink';
import CtaLinks from '../../base/shared/CtaLinks';
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
        this.props.content.panel.attributes[0].value,
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
    if (content.panel.cta_appstore) {
      content.panel.cta_appstore.link_text = 'Download from the Appstore';
    }
    if (content.panel.cta_googleplay) {
      content.panel.cta_googleplay.link_text = 'Get it on Google Play';
    }

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.panel.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.panel.body} className={`${classNamePrefix}__body`} format="richtext"/>
            { (content.panel.cta_appstore || content.panel.cta_googleplay) &&
              <ul className={`${classNamePrefix}__app-button-list`}>
                <li>
                  <CtaLink cta={content.panel.cta_appstore} variant="appstore" dataName={`appstore-${content.panel.heading}`} /> 
                </li>
                <li>
                  <CtaLink cta={content.panel.cta_googleplay} variant="googleplay" dataName={`googleplay-${content.panel.heading}`} />
                </li>
              </ul>
            }
            { content.panel.ctas &&
              <CtaLinks ctas={content.panel.ctas} variant="button" />
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

CmsComponentRegistry.register('app_teaser_panel', AppTeaserPanel, 'app-teaser');

export default AppTeaserPanel;
