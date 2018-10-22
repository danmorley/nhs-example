import React from 'react';
import ReactDOM from 'react-dom';
import MainCarouselShelf from './MainCarouselShelf';
import {
  MemoryRouter
} from 'react-router-dom';

describe('MainCarouselShelf', () => {

  it('renders without crashing with valid shelf types', () => {
    let content= {
      heading: "Learn More",
      items: [
        {
          "type":"banner_shelf",
          "value":{
            "heading":"Have a go at running",
            "body":"<p>Grab your trainers and get up and running in just 9 weeks with Couch to 5K!</p>",
            "background_image":{
              "title":"Couch to 5K banner",
              "renditions":{
                "mobile":"https://campaignstorage.blob.core.windows.net/oneyou-cms-production/images/MoveMore_hero_2.2e16d0ba.fill-375x307.jpg",
                "desktop":"https://campaignstorage.blob.core.windows.net/oneyou-cms-production/images/MoveMore_hero_2.2e16d0ba.fill-1440x366.jpg"
              }
            },
            "shelf_id":"couch-to-5k-banner",
            "meta_layout":"full_width",
            "meta_variant":"main-banner",
            "cta":{
              "link_text":"Download the app",
              "link_external":"/oneyou/apps/#one-you-couch-to-5k"
            },
            "image_meta":"banner_shelf/carousel_shelf/None"
          },
          "id":"3945321c-329c-4af7-a1c2-2af8bb1b49de"
        }
      ],
      field_id: "learn-more-shelf"
    }

    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><MainCarouselShelf content={content} /></MemoryRouter>, div)
  });

  it('renders without crashing with invalid shelf types', () => {
    let content= {
      heading: "Learn More",
      items: [
        {
          "type": "image_teaser",
          "value": {
            "heading": "Need Inspiration",
            "body": "<p>Then read this text to find out more.<br/></p>",
            "image": {
              "title": "10msu banner",
              "link": "https://campaignstorage.blob.core.windows.net/oneyou-cms-integration/original_images/2f86b9dd5ae29f46db9c66e3c89dfab1.jpg"
            },
            "meta_variant": "dark-bg",
            "cta": [],
            "field_id": ""
          },
          "id": "cd8878f0-ff2b-4442-84b2-24541a2b589f"
        }
      ],
      field_id: "learn-more-shelf"
    }

    const div = document.createElement('div');
    ReactDOM.render(<MainCarouselShelf content={content} />, div)
  });

})
