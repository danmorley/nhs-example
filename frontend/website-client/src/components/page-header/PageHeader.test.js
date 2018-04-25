import React from 'react';
import PageHeader from './PageHeader';
import { shallow } from 'enzyme';

describe('PageHeader', () => {
  let header = {
      title: 'test',
    };

    it('renders without crashing', () => {
      const div = document.createElement('div');
      shallow(<PageHeader header={header} />, div)
    })

})
