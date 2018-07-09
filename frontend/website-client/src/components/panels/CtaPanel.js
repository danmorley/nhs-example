import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import CtaLink from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './cta-panel.css';
import Panel from './Panel';

/**
 *
 *  content: {
 *
 *  }
 */
class CtaPanel extends Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__info`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <div className={`${classNamePrefix}__text`}>
            <Text content={content.body} className={`${classNamePrefix}__body`} format="richtext"/>
            <CtaLink cta={content.cta} variant="button" />
          </div>
        </div>
      </Panel>
    );
  }
}

CtaPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('cta_panel', CtaPanel, 'cta-panel');

export default CtaPanel;
