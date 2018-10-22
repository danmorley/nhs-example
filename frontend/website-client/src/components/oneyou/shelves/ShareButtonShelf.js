import React, { Component } from 'react';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import PropTypes from 'prop-types';
import './share-button-shelf.css';
import Shelf from '../../base/shelves/Shelf';
import ShareButtonPanel from '../panels/ShareButtonPanel';
import EmailButtonPanel from '../panels/EmailButtonPanel';
import PrintButtonPanel from '../panels/PrintButtonPanel';


class ShareButtonShelf extends Component {
  render() {
    const { showShareButton, showEmailButton, showPrintButton, trackingGroup } = this.props;

    return (
      <Shelf classNamePrefix="share-button-shelf" variant="align-right" trackingGroup={trackingGroup} id="share-button-shelf">
        <div className="shelf__container container">
          { showShareButton &&
            <ShareButtonPanel />
          }

          { showEmailButton &&
            <EmailButtonPanel {...this.props} />
          }

          { showPrintButton &&
            <PrintButtonPanel />
          }
        </div>
      </Shelf>
    );
  }
}

ShareButtonShelf.propTypes = {
  showShareButton: PropTypes.bool.isRequired,
  showEmailButton: PropTypes.bool.isRequired,
  showPrintButton: PropTypes.bool.isRequired,
  trackingGroup: PropTypes.string
};

CmsComponentRegistry.register('share_button_panel', ShareButtonShelf, 'share-button-panel');

export default ShareButtonShelf;
