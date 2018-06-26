import React from 'react';
import ReactDOM from 'react-dom';
import CookieBanner, { button } from './CookieBanner';
import { StaticRouter } from 'react-router'

describe('CookieBanner', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter>
        <CookieBanner />
      </StaticRouter>, div)
  })

  

})
