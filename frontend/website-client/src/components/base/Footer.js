import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FooterMenu from '../oneyou/header-nav/FooterMenu';
import Image from './Image.js';
import SocialLinks from '../oneyou/header-nav/SocialLinks';
import logo from '../../assets/images/public-health-england-logo.png';

class Footer extends Component {
  render() {
    const { className, content, site } = this.props;

    if (!content) {
      return null;
    }

    const { items, social_media, show_sitemap, heading, number_per_column } = content;
    const tempImage = { link: logo, title: 'PHE logo' };
    let social_media_component = null;

    if (social_media && social_media.length) {
      social_media_component = <div className ="col text-right">
        <SocialLinks links={social_media} site={site} />
      </div>
    }

    return (
      <div className={className}>
        <div className ="container">
          <div className = "row">
            <div className ="col footer-left">
              <Image image={tempImage} height="68" className="page-footer__phe-logo" />
              <FooterMenu
                items={items}
                show_sitemap={show_sitemap}
                heading={heading}
                number_per_column={number_per_column}
              />
            </div>
            {social_media_component}
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  content: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default Footer;
