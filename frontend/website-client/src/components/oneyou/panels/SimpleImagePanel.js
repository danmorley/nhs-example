import React, { Component } from 'react';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './simple-image-panel.css';
import Panel from './Panel';
import PropTypes from 'prop-types';
import Image from '../Image';
import ImageUtils from './ImageUtils';
import CtaUtils from '../shared/CtaUtils';
import UrlUtils from '../../base/shared/UrlUtils';
import { Link } from 'react-router-dom';

/**
 *  Simple Image panel component displaying just an image and nothing more.
 *
 *  content: {
 *    image: {
 *      title: 'Image name',
 *      link: 'https://blob store url'
 *    },
 *    image_cta: {
 *      link_text: 'Find out more',
 *      link_external: 'http://www.somewebsite.co.uk'
 *    }
 *  }
 */
class SimpleImagePanel extends Component {
  render() {
    const { content, classNamePrefix } = this.props;
    const layout = content.meta_layout_desktop + '-' + content.meta_layout_mobile;
    const imageUrl = ImageUtils.imageUrl(content.image, ImageUtils.placeholderBackgroundImage());
    const linkUrl = CtaUtils.getCtaPath(content.image_cta);

    return (
      <Panel id={content.panel_id || this.props.id} classNamePrefix={classNamePrefix} variant={content.meta_variant}
        layout={layout}>
        { linkUrl ? 
          this.renderClickableImage(imageUrl, content.image.title, linkUrl, content.image_cta.link_text) : 
          this.renderImage(imageUrl, content.image.title) 
        }
      </Panel>
    );
  }

  renderClickableImage(imageUrl, title, href, linkText, linkClass) {
    if (UrlUtils.isExternalLink(href)) {
      // External link - use normal <a> tag.
      return (
        <a className={linkClass} href={href}>
          <div className="image-wrapper">
            {this.renderImage(imageUrl, title)}
            <span className="image-caption hidden">{linkText}</span>
          </div>
        </a>
      );
    } else {
      // Internal link - use react router to prevent page refresh.
      return (
        <Link className={linkClass} to={href}>
          <div className="image-wrapper">
            {this.renderImage(imageUrl, title)}
            <span className="image-caption hidden">{linkText}</span>
          </div>
        </Link>
      );
    }
  }

  renderImage(imageUrl, title) {
    return (
      <Image image={{link: imageUrl, title: title}} className="img-fluid" />
    );
  }
}

SimpleImagePanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('simple_image_panel', SimpleImagePanel, 'simple-image-panel');

export default SimpleImagePanel;
