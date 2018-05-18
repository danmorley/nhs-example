import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './oneyou1-teaser.css';
import Panel from './Panel';
import CtaList from '../shared/CtaList';
import ImageUtils from './ImageUtils';
import CtaUtils from '../shared/CtaUtils';
import Collapsible from '../shared/Collapsible';

/**
 *
 *  content: {
 *
 *  }
 */
class Oneyou1TeaserPanel extends Component {
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
        <Text tagName="h3" content={content.heading} className={`${classNamePrefix}__heading`} />
        <div className={`${classNamePrefix}__image`} style={backgroundTeaserImage}>
          {/* // needs alt text */}
        </div>
        <div className={`${classNamePrefix}__text`}>
          <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
        </div>
        {this.renderCta()}
      </Panel>
    );
  }

  renderCta() {
    let { content, classNamePrefix } = this.props;

    if (!CtaUtils.isCta(content.cta)) return null;

    return (
      <div className={`${classNamePrefix}__cta-list`}>
        <Collapsible trigger={<h4>{content.cta_heading || 'Find out more'}</h4>} transitionTime={200}>
          <CtaList items={content.cta} />
        </Collapsible>
      </div>
    );
  }
}

Oneyou1TeaserPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('oneyou1_teaser', Oneyou1TeaserPanel, 'oneyou1-teaser');

export default Oneyou1TeaserPanel;
