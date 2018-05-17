import React, { Component } from 'react';
import Shelf from './Shelf';
import Text from '../Text';
import Image from '../Image';
import CtaLink from '../shared/CtaLink';
import CmsComponentRegistry from '../CmsComponentRegistry';
import styles from './article-page-heading-shelf.css';
import ImageUtils from '../panels/ImageUtils';
import { Link } from 'react-router-dom';

/**
 *  Article Page Heading Shelf is used to display article headings and an
 *  optional back button.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    heading: "Learn More",
 *    display_back_button: True or False,
 *    back_button_label: "Back"
 *  }
 */
class ArticlePageHeadingShelf extends Component {
  constructor (props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    alert('going back');
  }

  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    // let metaLayout = content.meta_layout || layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className="shelf__container container">
          <div className="row justify-content-center align-items-center">
            <div className="shelf__col col-12">
              {content.display_back_button && <Link to='/' className="shelf__backbutton">{content.back_button_label}</Link>}
              <Text tagName="h1" content={content.heading} />
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('article_page_heading_shelf', ArticlePageHeadingShelf, 'article-page-heading-shelf');

export default ArticlePageHeadingShelf;
