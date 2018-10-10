import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from './PageHeader';
import { shallow } from 'enzyme';
import {
  MemoryRouter
} from 'react-router-dom';

describe('PageHeader', () => {
  let header = {
    title: 'test',
  };

  let navItems = [
    {
      "type": "simple_menu_item",
      "value": {
        "link_text": "Home",
        "link_external": "",
        "link_page": {
          "id": 3,
          "slug": "home",
          "relative_path": "/oneyou/"
        }
      },
      "id": "3b9c8471-f143-4d03-b27e-c2a6824da79a"
    },
    {
      "type": "simple_menu_item",
      "value": {
        "link_text": "How are you? quiz",
        "link_external": "",
        "link_page": {
          "id": 5,
          "slug": "how-are-you-quiz",
          "relative_path": "/oneyou/how-are-you-quiz/"
        }
      },
      "id": "f33c25ac-44ec-4586-9169-ce97e551eb15"
    }
  ];
  it('renders without crashing', () => {
//    TODO fix to work with client hieght of ref element
//    const wrapper = shallow(<PageHeader header={header} navItems={navItems} />);
//    expect(wrapper.exists()).toBe(true);
  });
//
//  it('unmounts without crashing', () => {
//    const wrapper = shallow(<PageHeader header={header} navItems={navItems} />);
//    expect(wrapper.exists()).toBe(true);
//    wrapper.unmount();
//  });
})
