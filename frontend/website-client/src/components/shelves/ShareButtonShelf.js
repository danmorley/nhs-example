import React, { Component } from 'react';
import CmsComponentRegistry from '../CmsComponentRegistry';
import PropTypes from 'prop-types';
import './share-button-shelf.css';
import Shelf from './Shelf';
import ShareButtonPanel from '../panels/ShareButtonPanel';
import EmailButtonPanel from '../panels/EmailButtonPanel';
import PrintButtonPanel from '../panels/PrintButtonPanel';


class ShareButtonShelf extends Component {
  render() {
    const useShareButton = this.props.showShareButton;
    const useEmailButton = this.props.showEmailButton;
    const usePrintButton = this.props.showPrintButton;

    return (
      <div className="shelf__container container">
        <Shelf classNamePrefix="share-button-shelf" variant="align-right">
          { useShareButton &&
            <ShareButtonPanel />
          }

          { useEmailButton &&
            <EmailButtonPanel {...this.props} />
          }

          { usePrintButton &&
            <PrintButtonPanel />
          }
        </Shelf>
      </div>
    );
  }
}

ShareButtonShelf.propTypes = {
  showShareButton: PropTypes.bool.isRequired,
  showEmailButton: PropTypes.bool.isRequired,
  showPrintButton: PropTypes.bool.isRequired
};

CmsComponentRegistry.register('share_button_panel', ShareButtonShelf, 'share-button-panel');

export default ShareButtonShelf;
