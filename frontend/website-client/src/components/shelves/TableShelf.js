import React, { Component } from 'react';
import Shelf from './Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import Text from '../Text';
import styles from './table-shelf.css';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import SimpleTextPanel from '../panels/SimpleTextPanel';
import IconCardPanel from '../panels/IconCardPanel';

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
    var panels = row.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.value.field_id || panel.value.shelf_id || panel.value.panel_id || 'panel-' + panel.id;
      const panelClass = 'row-' + i;

      if (PanelClass) {
        return (<td key={i} className={panelClass}><PanelClass content={panel.value} classNamePrefix={panelClassNamePrefix} /></td>);
      } else {
        return (<td key={i} className={panelClass}><PlaceholderPanel panelType={panel.type} /></td>);
      }
    });

    return (<tr key={key}>{panels}</tr>);
  }

  render() {
    let { id, content, classNamePrefix, variant, layout } = this.props;
    let metaVariant = content.meta_variant || variant;
    let metaLayout = content.meta_layout || layout;

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix} variant={metaVariant} layout={metaLayout}>
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

CmsComponentRegistry.register('table', TableShelf, 'table-shelf', 'standard');

export default TableShelf;
