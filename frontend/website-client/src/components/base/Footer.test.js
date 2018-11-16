import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer.js';
import {
  MemoryRouter
} from 'react-router-dom';

beforeEach(function(){
  spyOn(console, 'error');
});

it('renders without crashing with no content', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Footer /></MemoryRouter>, div);
  expect(console.error).toHaveBeenCalled();
});


it('renders without crashing with content', () => {
  const div = document.createElement('div');
  const className = 'page-footer';
  const content = {
    image: {},
    items: [],
    social_media: []
  }
  const site = {
    footer: {},
    header: {},
    id: 1,
    is_default_site: true,
    menu: {},
    meta: {},
    port: 80,
    redirects: [],
    site_name: "test"
  }
  ReactDOM.render(<MemoryRouter><Footer className={className} content={content} site={site} /></MemoryRouter>, div);
});