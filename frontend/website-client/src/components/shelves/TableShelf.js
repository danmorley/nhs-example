import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';
import './table-shelf.css';
import MultiPanelBlock from '../pages/blocks/MultiPanelBlock';


/**
 *  Table Shelf is a shelf that can be used to
 *  display a table with any number of rows and cells.
 *
 *  It expects the following properties:
 *  - styles (to be confirmed)
 *
 */
class TableShelf extends Component {
  renderHeader(headerRow) {
    const headerCells = headerRow.map((columnHeading, i) => {
      return (<Text tagName="th" content={columnHeading} key={i}/>);
    });

    return (<tr>{headerCells}</tr>);
  }

  renderRow(row, key) {
    const panels = <MultiPanelBlock items={row} panelClass="row-item" containerTagName="td"/>;
    return (<tr key={key}>{panels}</tr>);
  }

  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} layout={metaLayout} trackingGroup={content.tracking_group}>
        <div className="shelf__container container">
          {content.heading && <h2 className="shelf__header">{content.heading}</h2>}
          <div className="row">
            <div className="col shelf__col">
              <table>
                {content.caption && <caption>{content.caption}</caption>}
                <thead>
                  {content.display_header && this.renderHeader(content.header)}
                </thead>
                <tbody>
                  {content.body_rows.map((row, i) => this.renderRow(row,i))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Shelf>
    );
  }

  static wrappedCellValue(value, wrapperClass) {
    return `<div className="${wrapperClass}">${value}</div>`;
  }
}

TableShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  variant: PropTypes.object,
  layout: PropTypes.object,
  id: PropTypes.object
};

CmsComponentRegistry.register('table', TableShelf, 'table-shelf', 'standard');

export default TableShelf;
