import React from 'react';
import ReactDOM from 'react-dom';
import PanelCarouselShelf from './PanelCarouselShelf';

describe('PanelCarouselShelf', () => {

  let content= {
    heading: "Learn More",
    items: [
      { "type": "image_teaser",
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
      "id": "cd8878f0-ff2b-4442-84b2-24541a2b589f"}
    ],
    field_id: "learn-more-shelf"
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PanelCarouselShelf content={content} />, div)
  })
  
})
