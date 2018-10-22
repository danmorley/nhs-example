import React from 'react';
import ReactDOM from 'react-dom';
import CtaLink from './CtaLink';
import {
  MemoryRouter
} from 'react-router-dom';

describe('CtaLink', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CtaLink />, div);
  });

  it('renders without crashing when a cta type is specified', () => {
    const cta = {type: 'single', value: {link_page: {relative_path: '/dummyurl'}}};
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLink cta={cta} /></MemoryRouter>, div);
  });

  it('renders without crashing when an invalid cta is provided', () => {
    const cta = {link_page: null};
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLink cta={cta} /></MemoryRouter>, div);
  });

  it('renders without crashing when an external link is provided', () => {
    const cta = {link_external: 'https://dummyurl.com'};
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLink cta={cta} /></MemoryRouter>, div);
  });

  it('renders without crashing when appstore variant is provided', () => {
    const cta = {link_external: 'https://dummyurl.com'};
    const variant = 'appstore';
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLink cta={cta} variant={variant} /></MemoryRouter>, div);
  });

  it('renders without crashing when googleplay variant is provided', () => {
    const cta = {link_external: 'https://dummyurl.com'};
    const variant = 'googleplay';
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><CtaLink cta={cta} variant={variant} /></MemoryRouter>, div);
  });
})
