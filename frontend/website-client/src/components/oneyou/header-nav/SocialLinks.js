import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SocialLinks extends Component {

  render() {
    let { links } = this.props;
    if (!links) return null;
        
    let items = links.map((item, i) => {
      if (item.type === 'social_media_link') {
        return (
          <li key={i}>
            <a href={item.value.link} target="_blank" tabIndex="-1" title="(opens in new window)" className={"page-footer__"+item.value.type}>
              <span className ="screen-reader-text">{item.value.type}</span>
            </a>
          </li>
        );
      } else {
        return null;
      }
    });

    return (
      <div className ="page-footer__social-media" id="social">
        <h5 className ="page-footer__follow-title">
          Follow us
        </h5>
        <ul className ="page-footer__social-links" aria-label="Social networks">
          {items}
        </ul>
      </div>
    );
  }
}

SocialLinks.propTypes = {
  links: PropTypes.array,
  site: PropTypes.object
};

export default SocialLinks;
