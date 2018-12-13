import React, { Component } from 'react';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './share-button.css';
import Panel from '../panels/Panel';

class ShareButtonPanel extends Component {  
  
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shareButtonClick = this.shareButtonClick.bind(this);
  }

  setShareButton(elem) {
    this.shareButton = elem;
  }

  handleClick(evt, item) {    
    if (item.share_item == "email") {
      return;
    } 
    else {
      evt.preventDefault();
      let left = (window.screen.width - 570) / 2,
        top = (window.screen.height - 570) / 2,
        params = 'menubar=no,toolbar=no,status=no,width=570,height=570,top=' + top + ',left=' + left;
        
      window.open(item.url, 'NewWindow',params);
    }
  }
  
  render() {
    
    let socialLinks = [
      {
        share_item: 'email',
        url: "mailto:?" + "body=" + window.location.href
      },
      {
        share_item: 'whatsapp',
        url: "whatsapp://send?text=" + " " + window.location.href
      },
      {
        share_item: 'facebook',
        url: "https://www.facebook.com/sharer/sharer.php?quote=" + "&" + "u=" + window.location.href
      },
      {
        share_item: 'twitter',
        url: "https://twitter.com/intent/tweet?text=" + "&" + "url=" + window.location.href
      }
    ];
    
    let items = socialLinks.map((item, i) => {
      let link =<a href={encodeURI(item.url)} title="(opens in new window)" onClick={(evt) => this.handleClick(evt, item)} >
                  <span className ="screen-reader-text">
                    {item.share_item}
                  </span>
                </a>;
                
      return (
        <li  className={"share-button__"+item.share_item} key={i}>
          {link}
        </li>
      );
    });

    return (
      <Panel classNamePrefix="share-button-panel" variant="align-right">
        <div className="share-button" ref={(elem) => this.setShareButton(elem)} onClick={(e) => this.shareButtonClick(e)} data-name="share-button">
          <span className="share-button__title">Share</span>
          <ul className="share-button__items">
            {items}
          </ul>
        </div>
      </Panel>
    );
  }

  shareButtonClick(_e) {
    this.shareButton.classList.add('share-button--reveal');
  }
}

ShareButtonPanel.propTypes = {
};

CmsComponentRegistry.register('share_button_panel', ShareButtonPanel, 'share-button-panel');

export default ShareButtonPanel;
