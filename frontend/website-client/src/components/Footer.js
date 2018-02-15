import React, { Component } from 'react';
import FooterMenu from './header-nav/FooterMenu';
import Image from './Image.js';
import SocialLinks from './header-nav/SocialLinks';

class Footer extends Component {
  render() {
    let { className, content, site } = this.props;

    if (!content) {
      return null;
    }

    let { image, links, social_media } = content;

    return (
      <div className={className}>
        <FooterMenu items={links} />
        <Image image={image} />
        <SocialLinks links={social_media} site={site} />
      </div>
    );
  }
}

export default Footer;
