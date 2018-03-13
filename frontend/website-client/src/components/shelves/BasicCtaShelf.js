import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './promo-shelf.css';

import sampleBgImage from './healthcheckup.png'; // Tell Webpack this JS file uses this image

/**
 *  Basic CTA Shelf is a simple shelf that can be used to display content
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
 *    shelf_id: "learn-more-shelf"
 *  }
 */
class BasicCtaShelf extends Component {

  renderImage(image) {
    // return (<img alt="roger"/>);
    return (<Image image={image} />);
  }

  renderHeadingBody(content, headingTagName) {
    return [
      (<Text key="1" tagName={headingTagName} content={content.heading} />),
      (<Text key="2" content={content.body} format="richtext"/>)
    ];
  }

  renderCta(cta) {
    if (!cta) return null;
    return (<CtaLink variant="button" cta={cta} />);
  }

  render() {
    let { content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;

    let backgroundImageShelfStyle = {
      backgroundImage: 'url(' + sampleBgImage + ')',
    };

    let backgroundColourShelfStyle = {
    };

    let shelfStyle = (content.background_image) ? backgroundImageShelfStyle : backgroundColourShelfStyle;
    let headingTagName = (classNamePrefix === 'page-heading-shelf') ? 'h1' : 'h2';

    if (metaLayout === 'image_on_left') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col">
                {this.renderImage(content.image)}
              </div>
              <div className="shelf__col col">
              {this.renderHeadingBody(content, headingTagName)}
              {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'image_on_right') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
              <div className="shelf__col col">
                {this.renderImage(content.image)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'cta_on_left') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col col-vertical-center">
                {this.renderCta(content.cta)}
              </div>
              <div className="shelf__col col col-vertical-center md-content-right">
                {this.renderHeadingBody(content, headingTagName)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'cta_on_right') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col col-vertical-center">
                {this.renderHeadingBody(content, headingTagName)}
              </div>
              <div className="shelf__col col col-vertical-center md-content-right">
                {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'full_width') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container-fluid" style={shelfStyle}>
            <div className="container">
              <div className="row">
                <div className="shelf__col col-10 col-sm-10">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                </div>
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'full_to_half_width') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant} layout={metaLayout}>
          <div className="container full-to-half-width">
            <div className="shelf__container container" style={shelfStyle}>
              <div className="row">
                <div className="shelf__col col col-vertical-center">
                  {this.renderHeadingBody(content, headingTagName)}
                </div>
                <div className="shelf__col col col-vertical-center md-content-right">
                  {this.renderCta(content.cta)}
                </div>
              </div>
            </div>
          </div>
        </Shelf>
      );
    }
     else if (metaLayout === 'page_header') {
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container-fluid" style={shelfStyle}>
            <div className="container">
              <div className="row">
                <div className="shelf__col col-10 col-sm-8">
                  {this.renderHeadingBody(content, headingTagName)}
                  {this.renderCta(content.cta)}
                </div>
              </div>
            </div>
          </div>
        </Shelf>
      );
    } else if (metaLayout === 'section_heading') {
        return (
          <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
            <div className="shelf__container container" style={shelfStyle}>
              <div className="row">
                <div className="col shelf__col">
                  {this.renderHeadingBody(content, headingTagName)}
                </div>
              </div>
            </div>
          </Shelf>
        );
    } else {
      // Default layout: ???
      return (
        <Shelf id={content.shelf_id || this.props.id} classNamePrefix={classNamePrefix} variant={metaVariant}>
          <div className="shelf__container container" style={shelfStyle}>
            <div className="row">
              <div className="shelf__col col-12 col-vertical-center">
                {this.renderHeadingBody(content, headingTagName)}
                {this.renderCta(content.cta)}
              </div>
            </div>
          </div>
        </Shelf>
      );
    }
  }
}

// Basic CTA Shelf
//
// Layouts: image_on_left, image_on_right, full_width
// Variants:
CmsComponentRegistry.register('basic_cta_shelf', BasicCtaShelf, 'basic-cta-shelf');

// Banner Shelf
//
// Layouts: cta_on_right, cta_on_left
// Variants: banner
CmsComponentRegistry.register('banner_shelf', BasicCtaShelf, 'banner-shelf', 'banner');

// Promo Shelf
//
// Layouts: cta_on_right, cta_on_left
// Variants: promo
CmsComponentRegistry.register('promo_shelf', BasicCtaShelf, 'promo-shelf', 'promo');

// App Shelf
//
// Layouts: app
// Variants: none
CmsComponentRegistry.register('app_shelf', BasicCtaShelf, 'app-shelf', 'app');

//
// Page Heading Shelf - used as the page heading on sub-pages, but also on the home page
//
// Layouts: page_header
// Variants: home-page, sub-page
CmsComponentRegistry.register('page_heading_shelf', BasicCtaShelf, 'page-heading-shelf', 'home-page', 'page_header');

export default BasicCtaShelf;
