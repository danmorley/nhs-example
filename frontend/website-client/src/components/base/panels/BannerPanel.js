import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './Panel';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './banner-panel.css';
import ShelfUtils from '../shared/ShelfUtils';
import Banner from '../shared/Banner';
import ImageUtils from './ImageUtils';

/**
 *  Banner Shelf is a simple shelf that can be used to display content
 *  from the basic_cta_shelf type Wagtail streamfield.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    body: "Some body text",
 *    background_image: "url to image",
 *    field_id: "learn-more-shelf"
 *  }
 * 
 *  Layouts:
 *    image_on_left: 
 */
class BannerPanel extends Component {
  renderImage(image, classname) {
    return (<Image image={image} class={classname} />);
  }

  renderHeading(text, headingTagName, colClass) {
    if (!text) return null;
    return (
      <div className={`banner-shelf-heading ${colClass || ''}`}>
        <Text tagName={headingTagName} content={text} />
      </div>
    );
  }

  renderBody(text, colClass) {
    if (!text) return null;
    return (
      <div className={`banner-shelf-body ${colClass | ''}`}>
        <Text content={text} format="richtext" />
      </div>
    );
  }

  renderCta(cta, colClass) {
    if (!cta) return null;
    return (
      <div className={`banner-shelf-cta ${colClass || ''}`}>
        <CtaLink variant="button" cta={cta} />
      </div>
    );
  }

  render() {
    const { id, content, classNamePrefix, variant, layout, width } = this.props;

    const metaVariant = content.meta_variant || variant || 'primary';
    const metaLayout = content.meta_layout || layout || 'vertical_left';
    const [ direction, alignment ] = metaLayout.split('_');

    const headingTagName = (classNamePrefix === 'page-heading-panel') ? 'h1' : 'h2';
    const panel = content.panel ? content.panel : content;
    const containerClass = `shelf__container ${ShelfUtils.shelfContainerClass(content)}`;
    const classExtra = ImageUtils.isValid(panel.background_image) ? 'banner-panel--imagebackground' : null;

    const banner = (
      <Banner 
        backgroundImage={panel.attributes[0].value}
        heading={<Text tagName={headingTagName} content={panel.heading} />}
        body={<Text content={panel.body} format="richtext"/>}
        ctas={panel.ctas}
        layout={metaLayout}
        panel
      />
    );

    width

    return (
      <Panel id={id} classNamePrefix={classNamePrefix} variant={metaVariant} trackingGroup={content.tracking_group} layout={`align-${alignment}`} classExtra={classExtra}>
        {width == "full" && banner}
      </Panel>
    );
  }
}

BannerPanel.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  layout: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string
}

CmsComponentRegistry.register('banner_panel', BannerPanel, 'banner-panel', 'banner');

export default BannerPanel;
