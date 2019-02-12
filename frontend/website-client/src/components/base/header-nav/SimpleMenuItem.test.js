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

  let link_page_item = {
    value: {
      link_page: {relative_path: '/test.com'},
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

  it('renders without crashing with a link page relative path', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter>
        <SimpleMenuItem item={link_page_item}/>
      </StaticRouter>, div)
  });
})
