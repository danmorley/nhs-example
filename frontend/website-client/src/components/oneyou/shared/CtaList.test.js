import React from 'react';
import ReactDOM from 'react-dom';
import CtaList from './CtaList';
import {
  MemoryRouter
} from 'react-router-dom';

describe('CtaList', () => {
  let items = [{link_page: {relative_path: '/dummyurl'}}];

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<MemoryRouter><CtaList items={items} /></MemoryRouter>, div);
  });
})
