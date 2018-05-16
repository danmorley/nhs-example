import React from 'react';
import ReactDOM from 'react-dom';
import SiteMapShelf from './SiteMapShelf';
import {
  MemoryRouter
} from 'react-router-dom';

describe('SiteMapShelf', () => {

  it('renders without crashing', () => {
    let site = {
      menu: {
        items: ['test', 'test'],
      },
      footer: {
        items: ['test', 'test']
      }
    }

    const div = document.createElement('div');
    ReactDOM.render(<SiteMapShelf site={site} />, div)
  });

  it('renders without crashing with simple menu items in the footer', () => {
    let site = {
      menu: {
        items: ['test', 'test'],
      },
      footer: {
        items: [
          {
            type: 'simple_menu_item',
            value: {
              link_text: 'Test Footer Link',
              link_page: {},
              link_external: 'https://test.com'
            }
          }
        ]
      }
    }

    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SiteMapShelf site={site} /></MemoryRouter>, div)
  });

  it('renders without crashing with simple menu items in the header', () => {
    let site = {
      menu: {
        items: [
          {
            type: 'simple_menu_item',
            value: {
              link_text: 'Test Simple Header Link',
              link_page: {},
              link_external: 'https://test.com'
            }
          }
        ]
      },
      footer: {
        items: ['test', 'test']
      }
    }

    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SiteMapShelf site={site} /></MemoryRouter>, div)
  });

  it('renders without crashing with multi menu items in the header', () => {
    let site = {
      menu: {
        items: [
          {
            type: 'multi_menu_item',
            value: {
              menu_items: [
                {
                  type: 'simple_menu_item',
                  value: {
                    link_text: 'Test Simple Header Link',
                    link_page: {},
                    link_external: 'https://test.com'
                  }
                }
              ]
            }
          }
        ]
      },
      footer: {
        items: ['test', 'test']
      }
    }

    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SiteMapShelf site={site} /></MemoryRouter>, div)
  });

})
