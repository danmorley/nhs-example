import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';
import './triage-tool-shelf.css';
import TriageTool from 'triage-tool';


/**
 *  Triage Tool Shelf is a simple shelf that can be used to display the
 *  stop smoking triage tool.
 */
class TriageToolShelf extends Component {
  render() {
    let { id, content, classNamePrefix, variant } = this.props;
    let metaVariant = content.meta_variant || variant;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant}>
        <div className="container">
          {content.heading != '' &&
            <Text tagName="h2" content={content.heading} className="shelf__header" />
          }
          {content.body != '' &&
            <Text tagName="div" content={content.body} className="shelf__body" format="richtext"/>
          }
          <div className="row">
            <div className="shelf__col col-sm-12">
              <p>&lt;THE TRIAGE TOOL WILL APPEAR HERE&gt;</p>
              <TriageTool></TriageTool>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }
}

TriageToolShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.string,
  id: PropTypes.string
};

CmsComponentRegistry.register('triage_tool_shelf', TriageToolShelf, 'triage-tool-shelf');

export default TriageToolShelf;
