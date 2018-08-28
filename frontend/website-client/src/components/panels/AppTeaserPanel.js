import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CtaLink from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './app-teaser.css';
import Panel from './Panel';
import ImageUtils from './ImageUtils';

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

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
            { content.cta_appstore || content.cta_googleplay &&
              <ul className="panel__button-list">
                <li>
                  <CtaLink cta={content.cta_appstore} variant="appstore"/>
                </li>
                <li>
                  <CtaLink cta={content.cta_googleplay} variant="googleplay"/>
                </li>
              </ul>
            }
            { content.cta &&
              <ul className="panel__button-list">
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
