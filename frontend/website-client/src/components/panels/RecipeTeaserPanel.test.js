import React from 'react';
import ReactDOM from 'react-dom';
import RecipeTeaserPanel from './RecipeTeaserPanel';
import { shallow } from 'enzyme';


const classNamePrefix = "recipe-teaser"
const content = { heading: "Smoked salmon",
                    background_image: null,
                    shelf_id: null,
                    image_meta: "recipe_teaser/recipe_grid_shelf/None"
                 }
const id = "panel-3737f039-12e6-4103-ac3b-0c9e253b5583"

const content_update = { heading: "Salmon",
                            background_image: null,
                            shelf_id: null,
                            image_meta: "recipe_teaser/recipe_grid_shelf/None"
                         }

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeTeaserPanel classNamePrefix={classNamePrefix} content={content} id={id} />, div);
});


it('it can receive new props without crashing', () => {
    const wrapper = shallow(<RecipeTeaserPanel classNamePrefix={classNamePrefix} content={content} id={id} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ content_update });
});
