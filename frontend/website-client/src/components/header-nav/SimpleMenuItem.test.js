import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMenuItem from './SimpleMenuItem';
import { StaticRouter } from 'react-router';


describe('SimpleMenuItem', () => {
  let item = {
    value: {
      link_page: 'test',
      link_external: 'test',
      link_text: 'test'
    }
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter>
        <SimpleMenuItem item={item}/>
      </StaticRouter>, div)
  });

})
