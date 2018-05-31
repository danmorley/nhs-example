import React from 'react';
import ReactDOM from 'react-dom';
import RecipeGridShelf from './RecipeGridShelf';

const classNamePrefix = "recipe-grid-shelf";
const content = {
    heading: "",
    image_meta: "recipe_grid_shelf/None/None",
    items: [
        {
            id: "026c6efb-699b-4d32-9fc0-aae375386db2",
            type: "recipe_teaser",
            value: {
                background_image: {title: "Active10.jpg", renditions: null},
                heading: "Eggs and Avacado",
                image_meta: "recipe_teaser/recipe_grid_shelf/None",
                shelf_id: null
            }
        }
      ],
    meta_image_display: "contain",
    rows_to_show: 0,
    shelf_id: ""
  }
const id = "shelf-8c3540a6-0358-4c80-80e3-2ae61844f05d"
const layout = "responsive_2_col"
const site = {id: 2, port: 80, site_name: "oneyou", is_default_site: true, menu: {}}
const variant = null

const invalid_content = {
        heading: "",
        image_meta: "recipe_grid_shelf/None/None",
        items: [
            {
                id: "026c6efb-699b-4d32-9fc0-aae375386db2",
                type: "test",
                value: {
                    background_image: {title: "Active10.jpg", renditions: null},
                    heading: "Eggs and Avacado",
                    image_meta: "recipe_teaser/recipe_grid_shelf/None",
                    shelf_id: null
                }
            }
          ],
        meta_image_display: "contain",
        rows_to_show: 0,
        shelf_id: ""
      }

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeGridShelf classNamePrefix={classNamePrefix}
        content={content}
        id={id}
        layout={layout}
        site={site}
        variant={variant} />, div);
});

it('renders without crashing with invalid panel type', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeGridShelf classNamePrefix={classNamePrefix}
        content={invalid_content}
        id={id}
        layout={layout}
        site={site}
        variant={variant} />, div);
});
