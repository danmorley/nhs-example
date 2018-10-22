import React from 'react';
import ReactDOM from 'react-dom';
import AccordionItem from './AccordionItem';

describe('AccordionItem', () => {
  let content = {
    tracking_group: "",
    heading: "Accordion 1",
    items: [
      {
        type: "rich_text_panel",
        value: {
          text: "<p>Accordion 1 content.</p><p>Roof party yr yuccie tofu raclette sriracha quinoa squid occupy gentrify pork belly irony artisan subway tile disrupt. Live-edge typewriter polaroid disrupt chia quinoa. Copper mug adaptogen chartreuse jianbing ennui. Roof party shoreditch keffiyeh, craft beer farm-to-table gochujang 8-bit slow-carb hexagon. Lo-fi artisan YOLO tilde, vice air plant woke kale chips semiotics hexagon shoreditch iPhone fixie heirloom hammock. La croix wayfarers tilde austin vegan readymade everyday carry polaroid. Chicharrones stumptown tousled bicycle rights freegan la croix butcher, bushwick heirloom woke taiyaki readymade intelligentsia microdosing.</p>",
          meta_variant: "standard",
          image_meta: "rich_text_panel/accordion_shelf/None"
        },
        id: "fc912b6c-f690-4690-815f-c01d7649ec95"
      }
    ],
    shelf_id: "",
    image_meta: "accordion_shelf/None/None"
  };

  let classNamePrefix = 'accordion-shelf';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AccordionItem content={content} classNamePrefix={classNamePrefix}/>, div);
  });
})
