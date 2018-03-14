import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';

/**
 *  General Text Shelf is a simple shelf that can be used to
 *  display rich text, usually from a rich text field in Wagtail.
 *
 *  It expects the following properties:
 *  - content
 *  - styles (to be confirmed)
 *
 *  content: {
 *    text: "<p>Some <b>HTML</b> text to print.</p>"
 *  }
 */
class GeneralTextShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={content.meta_variant}>
        <div className="shelf__container container">
          <div className="row">
            <div className="shelf__col col-12 col-vertical-center">
              <p dangerouslySetInnerHTML={{__html: content.text}} />
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

CmsComponentRegistry.register('general_text_shelf', GeneralTextShelf, 'general-text-shelf');

export default GeneralTextShelf;
