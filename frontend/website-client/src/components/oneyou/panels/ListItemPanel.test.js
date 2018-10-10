import React from 'react';
import ReactDOM from 'react-dom';
import ListItemPanel from './ListItemPanel';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const content = {text: "Item 1", image_meta: "list_item_panel/grid_shelf/2_col_1_on_mobile"}
    ReactDOM.render(<ListItemPanel content={content} />, div);
});