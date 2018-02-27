import Page from '../Page';
import withOwnContent from './withOwnContent';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
const sampleShelves = {
  title: 'Shelf Samples',
  body: [
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'grid-shelf-1',
      type: 'grid_shelf',
      value: {
        heading: 'Sample Grid Shelf',
        items: [
          {
            id: 'video-teaser-1',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              cta_link_label: 'Find out more',
              cta_link: 'http://www.somewebsite.co.uk',
              meta_variant: 'yellow'
            }
          },
          {
            id: 'video-teaser-2',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              cta_link_label: 'Find out more',
              cta_link: 'http://www.somewebsite.co.uk'
            }
          },
          {
            id: 'video-teaser-3',
            type: 'video_teser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              cta_link_label: 'Find out more',
              cta_link: 'http://www.somewebsite.co.uk'
            }
          },
          {
            id: 'video-teaser-4',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              cta_link_label: 'Find out more',
              cta_link: 'http://www.somewebsite.co.uk'
            }
          },
          {
            id: 'oneyou2-teaser-1',
            type: 'oneyou2_teaser',
            value: {
              heading: 'Be Active With a Disability',
              body: 'There are so many ways to move - whatever your situation. Get ideas on the EDFS website',
              cta_link_label: 'http://www.edfs.co.uk',
              cta_link: 'http://www.edfs.co.uk'
            }
          }
        ],
        meta_variant: 'blue_background'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Carousel Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'carousel-1',
      type: 'carousel_shelf',
      value: {
        heading: 'Sample Carousel Shelf',
        items: [
          {
            id: 'carousel-promo-shelf-1',
            type: 'promo_shelf',
            value: {
              heading: 'html::Active <span class="marker">10</span> App',
              body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
              cta_button_label: 'Download',
              cta_button_link: 'http://www.somewebsite.co.uk',
              background_image: 'http://aaa.bbb.ccc/gb.png',
              meta_layout: 'full_width',
              meta_variant: 'main-banner'
            }
          },
          {
            id: 'carousel-promo-shelf-2',
            type: 'promo_shelf',
            value: {
              heading: 'html::Active <span class="marker">10</span> App',
              body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
              cta_button_label: 'Download',
              cta_button_link: 'http://www.somewebsite.co.uk',
              background_image: 'http://aaa.bbb.ccc/gb.png',
              meta_layout: 'full_width',
              meta_variant: 'main-banner'
            }
          }
        ],
        meta_variant: 'blue_background'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>full_width</b>, variant <b>main-banner</b>'
      }
    },
    {
      id: 'promo-shelf-1',
      type: 'page_heading',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'main-banner'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>cta_on_right</b>, variant <b>how-are-you</b>'
      }
    },
    {
      id: 'promo-shelf-2',
      type: 'promo_shelf',
      value: {
        heading: 'html::How are <span class="marker">you</span>? Quiz',
        cta_button_label: 'Have a go',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>cta_on_right</b>, variant <b>how-are-you</b>'
      }
    },
    {
      id: 'promo-shelf-3',
      type: 'promo_shelf',
      value: {
        heading: 'html::Tell us what <span class="marker">you</span> Think',
        cta_button_label: 'Send a message',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'promo-shelf-4',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        background_image: 'http://aaa.bbb.ccc/gb.png'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>not given</b>, variant <b>blue_background</b>'
      }
    },
    {
      id: 'basic-cta-shelf-1',
      type: 'promo_shelf',
      value: {
        heading: 'html::<span class="text-light">Over 40?</span><br />Check Your Health',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_variant: 'extra-height'
      }
    },
    {
      id: 'video-shelf-1',
      type: 'video_shelf',
      value: {
        heading: 'Walk the walk, talk the talk',
        body: 'Share walking stories and your progress with others online',
        cta_link_label: 'Find out more',
        cta_link: 'http://www.somewebsite.co.uk'
      }
    }
  ]
};

export default withOwnContent(Page, sampleShelves);
