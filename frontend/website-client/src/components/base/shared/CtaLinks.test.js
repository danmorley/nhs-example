import React from 'react';
import ReactDOM from 'react-dom';
import CtaLinks from './CtaLinks';
import {
  MemoryRouter
} from 'react-router-dom';

describe('CtaLinks', () => {
  it('renders without crashing', () => {
    const cta = {link_page: {relative_path: '/dummyurl'}};
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLinks cta={cta} /></MemoryRouter>, div);
  });
})
