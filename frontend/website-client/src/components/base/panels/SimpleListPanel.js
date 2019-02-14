import React, { Component } from 'react';
// import Text from '../Text';
// import CtaLinks from '../shared/CtaLinks';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './simple-list-panel.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import MultiPanelBlock from '../../base/blocks/MultiPanelBlock';

class SimpleListPanel extends Component {
  render() {
    let { classNamePrefix, layout, variant, content } = this.props;
    let metaLayout = content.meta_layout || layout;
    let metaVariant = content.meta_variant || variant;
    
    const ListClass = ((metaLayout) => {
      switch(metaLayout) {
      case 'full_width':
        return 'col-sm-12';
      case '2_col_1_on_mobile':
        return 'col-sm-12 col-md-6';
      default:
        return 'col-sm-12';
      }
    })(metaLayout);
    
    const ListStyle = ((metaVariant) => {
      switch(metaVariant) {
      case 'bullet_standard':
        return 'bullet-standard';
      case 'bullet_alt':
        return 'bullet_alt';
      case 'numeric_standard':
        return 'numeric-standard';
      case 'numeric_alt':
        return 'numeric-alt';
      default:
        return 'bullet-standard';
      }
    })(metaVariant);
  
    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant} layout={metaLayout}>
        { ListStyle.includes('bullet') &&
          <ul className={`row ${classNamePrefix} ${classNamePrefix}--${ListStyle}`}>
            { MultiPanelBlock.renderItems(content.items, `${classNamePrefix}__item ${classNamePrefix}__item--${ListStyle} ${ListClass}`, 'li') }
          </ul>
        }
        { ListStyle.includes('numeric') &&
          <ol className={`row ${classNamePrefix} ${classNamePrefix}--${ListStyle}`}>
            { MultiPanelBlock.renderItems(content.items, `${classNamePrefix}__item ${classNamePrefix}__item--${ListStyle} ${ListClass}`, 'li') }
          </ol>
        }
      </Panel>
    );
  }
}

SimpleListPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  layout: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.string
};

CmsComponentRegistry.register('simple_list_panel', SimpleListPanel, 'simple-list', null, null);

export default SimpleListPanel;
