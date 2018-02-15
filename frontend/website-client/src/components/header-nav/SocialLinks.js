import React, { Component } from 'react';

class SocialLinks extends Component {

  render() {
    let { links, site } = this.props;
    if (!links) return null;

    let items = links.map((item, i) => {
      if (item.type === 'social_media_link') {
        return (
          <li key={i} className={item.value.type}>
            <a href={item.value.link} target="_blank" tabIndex="-1" title="(opens in new window)" className="external"></a>
          </li>
        );
      } else {
        return null;
      }
    });

    return (
      <div className="social-media" id="social">
        <span className="follow-one-you hidden-sm hidden-md">
          Follow <span dangerouslySetInnerHTML={{__html: site.site_name}} />
        </span>
        <span className="follow-us">
          Follow us
        </span>
        <ul aria-label="Social networks">
          {items}
        </ul>
      </div>
    );
  }
}

export default SocialLinks;
