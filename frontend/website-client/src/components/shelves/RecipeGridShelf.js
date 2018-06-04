import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from '../shelves/Shelf';
import CmsComponentRegistry from '../CmsComponentRegistry';
import './grid-shelf.css';
import ShowMorePanel from '../shared/ShowMorePanel';

import PlaceholderPanel from '../panels/PlaceholderPanel';
import RecipeTeaserPanel from '../panels/RecipeTeaserPanel';

/**
 *  Grid Shelf is a simple shelf that can be used to display other
 *  components in a grid.
 *
 *  It expects the following Layouts:
 *
 *  responsive_2_col
 *  full_width
 */
class RecipeGridShelf extends Component {
  render() {
    let { id, content, classNamePrefix } = this.props;
    let metaImageDisplay = content.meta_image_display;

    const panelClass = 'shelf__col col-6 col-md-3';

    var panels = content.items.map((panel, i) => {
      const panelInfo = CmsComponentRegistry.components[panel.type];
      const PanelClass = panelInfo && panelInfo.class;
      const panelClassNamePrefix = panelInfo && panelInfo.classNamePrefix;
      const panelId = panel.value.field_id || panel.value.shelf_id || 'panel-' + panel.id;

      if (PanelClass) {
        return (<div key={i} className={panelClass}><PanelClass content={panel.value} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      } else {
        return (<div key={i} className={panelClass}><PlaceholderPanel panelType={panel.type} id={panelId} classNamePrefix={panelClassNamePrefix}/></div>);
      }
    });

    return (
      <Shelf id={id} classNamePrefix={classNamePrefix}>
        <div className={`shelf__container container image--${metaImageDisplay}`}>
          <h2 className="shelf__header">{content.heading}</h2>
          <ShowMorePanel rowsToShow={content.rows_to_show}>
            {panels}
          </ShowMorePanel>
        </div>
      </Shelf>
    );
  }
}

RecipeGridShelf.propTypes = {
  content: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  id: PropTypes.string
};

CmsComponentRegistry.register('recipe_grid_shelf', RecipeGridShelf, 'recipe-grid-shelf', null, 'responsive_2_col');

export default RecipeGridShelf;
