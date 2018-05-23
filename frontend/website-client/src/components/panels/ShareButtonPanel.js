import React, { Component } from 'react';
import Text from '../Text';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './share-button.css';
import Panel from './Panel';
import PropTypes from 'prop-types';

class ShareButtonPanel extends Component {  
  
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shareButtonClick = this.shareButtonClick.bind(this);
    this.socialWindow = this.socialWindow.bind(this);
  }
  
   socialWindow(url) {
    var left = (window.screen.width - 570) / 2;
    var top = (window.screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    window.open(encodeURI(url),"NewWindow",params);
  }
  
  setShareButton(elem) {
    this.shareButton = elem;
  }
  
  handleClick(evt, shareText) {
    let pageUrl = window.location.href,
      title = document.title,
      site = '';  
      
    switch (evt.currentTarget.getAttribute('data-social-type')) {
      case 'facebook':
        evt.preventDefault();
        site = "https://www.facebook.com/sharer/sharer.php?quote=" + shareText + "&amp;" + "u=;" + pageUrl;
        this.socialWindow(site);
        break;
      case 'twitter':
        evt.preventDefault();
        site = "https://twitter.com/intent/tweet?text=" + shareText + "&amp;" + "url=" + pageUrl;
        this.socialWindow(site);
        break;
      case 'email':
        var link = "mailto:"
            + "?subject=" 
            + shareText 
            + "&body=" + pageUrl;
          evt.currentTarget.href=link;
        break;
      case 'whatsapp':
        evt.preventDefault();
        site = "whatsapp://send?text=" + shareText + " " + pageUrl;
        this.socialWindow(site);
        break;
      default:
        break;
      }
  }

  render() {
    let { content, classNamePrefix } = this.props;
    
    let items = content.social_links.map((item, i) => {
      return (
        <li className={"share-button__"+item.share_item} key={i}>
          <a href="#" data-social-type={item.share_item} title="(opens in new window)" onClick={(evt) => this.handleClick(evt, item.share_text)}
          ></a>
        </li>
      );
    });
  
    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="share-button" ref={(elem) => this.setShareButton(elem)} onClick={(e) => this.shareButtonClick(e)}>
          <span className="share-button__title">Share</span>
          <ul className="share-button__items">  
            {items}
          </ul>
        </div>
      </Panel>
    );
  }
  
  shareButtonClick(e) {
    this.shareButton.classList.add('share-button--reveal');
  }
}

ShareButtonPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('share_button_panel', ShareButtonPanel, 'share-button-panel');

export default ShareButtonPanel;
