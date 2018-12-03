import React, { Component } from 'react';
import CmsComponentRegistry from '../../base/CmsComponentRegistry';
import './share-button.css';
import Panel from '../panels/Panel';

const SOCIAL_LINKS = [
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


class ShareButtonPanel extends Component {
  
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shareButtonClick = this.shareButtonClick.bind(this);
    this.socialWindow = this.socialWindow.bind(this);
  }
  
  
  popup() {
    var left = (window.screen.width - 570) / 2;
    var top = (window.screen.height - 570) / 2;
    var params = 'menubar=no,toolbar=no,status=no,width=570,height=570,top=' + top + ',left=' + left;
    window.open(this.href, 'NewWindow',params);
  }

  socialWindow(url) {
    var left = (window.screen.width - 570) / 2;
    var top = (window.screen.height - 570) / 2;
    var params = 'menubar=no,toolbar=no,status=no,width=570,height=570,top=' + top + ',left=' + left;
    window.open(encodeURI(url), 'NewWindow',params);
  }

  setShareButton(elem) {
    this.shareButton = elem;
  }

  handleClick(evt) {
    let pageUrl = window.location.href,
      site = '';

    switch (evt.currentTarget.getAttribute('data-social-type')) {
    case 'facebook':
      evt.preventDefault();
      evt.currentTarget.href = "https://www.facebook.com/sharer/sharer.php?quote=" + "&" + "u=" + pageUrl;
      this.socialWindow(site);
      break;
    case 'twitter':
      evt.preventDefault();
      evt.currentTarget.href = "https://twitter.com/intent/tweet?text=" + "&" + "url=" + pageUrl;
      this.socialWindow(site);
      break;
    case 'email':
      var link = "mailto:?"
          + "body=" + pageUrl;
      evt.currentTarget.href=link;
      break;
    case 'whatsapp':
      evt.preventDefault();
      evt.currentTarget.href = "whatsapp://send?text=" + " " + pageUrl;
      this.socialWindow(site);
      break;
    default:
      break;
    }
  }

  render() {
    let items = SOCIAL_LINKS.map((item, i) => {
      let left = (window.screen.width - 570) / 2;
      let top = (window.screen.height - 570) / 2;
      let link ="<a href= "  + encodeURI(item.url) + " title='(opens in new window)'" 
              
                +">"
                
                + "<span className =\"screen-reader-text\">" + "share to " + item.share_item + "</span>"
                
                + "</a>";
              
                
      return (
      <React.Fragment key={i}>
          <li  className={"share-button__"+item.share_item} key={i} dangerouslySetInnerHTML={{ __html: link }}/>
          
          
       </React.Fragment>
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
