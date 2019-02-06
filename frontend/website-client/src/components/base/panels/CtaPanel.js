import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from '../../base/Text';
import CtaLinks from '../../base/shared/CtaLinks';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './cta-panel.css';
import Panel from '../../base/panels/Panel';

/**
 *
 *  content: {
 *
 *  }
 */
class CtaPanel extends Component {

  render() {
    let { content, classNamePrefix } = this.props;

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className={`${classNamePrefix}__col`}>
          <Text tagName="h3" content={content.heading}  className={`${classNamePrefix}__heading`} />
          <Text content={content.body} className={`${classNamePrefix}__text`} format="richtext"/>
        </div>
        <div className={`${classNamePrefix}__col`}>
          <CtaLinks ctas={content.ctas} variant="button" />
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
