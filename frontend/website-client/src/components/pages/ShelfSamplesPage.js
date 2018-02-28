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
        heading: 'Grid Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'grid-shelf-1',
      type: 'grid_shelf',
      value: {
        heading: 'Sample Grid Shelf',
        rows_to_show: 1,
        items: [
          {
            id: 'video-teaser-1',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              image: {
                title: 'IMage name',
                link: 'https://blob store url'
              },
              video: '12345',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              },
              meta_variant: 'yellow'
            }
          },
          {
            id: 'video-teaser-2',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              video: '12345',
              image: {
                title: 'IMage name',
                link: 'https://blob store url'
              },
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          },
          {
            id: 'video-teaser-3',
            type: 'video_teser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              video: '384294381290482903',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          },
          {
            id: 'video-teaser-4',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: 'Share walking stories and your progress with others online',
              image: {
                title: 'IMage name',
                link: 'https://blob store url'
              },
              video: '123456',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.edfs.co.uk'
              }
            }
          },
          {
            id: 'oneyou1-teaser-1',
            type: 'oneyou1_teaser',
            value: {
              heading: 'Be Active With a Disability',
              body: 'There are so many ways to move - whatever your situation. Get ideas on the EDFS website',
              image: {
                title: '',
                link: ''
              },
              cta: [
                {
                  link_text: 'Link 1 text',
                  link_external: 'http://www.edfs.co.uk'
                },
                {
                  link_text: 'Link 2 text',
                  page: 3
                }
              ]
            }
          },
          {
            id: 'oneyou2-teaser-2',
            type: 'oneyou2_teaser',
            value: {
              heading: 'Be Active With a Disability',
              body: 'There are so many ways to move - whatever your situation. Get ideas on the EDFS website',
              cta_link_label: 'http://www.edfs.co.uk',
              cta_link: 'http://www.edfs.co.uk',
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
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf (Jira Sub Page Heading Shelf ON2-90)',
        body: '<p>Type <b>page_heading_shelf</b>, Layout <b>full_width</b>, variant <b>home-page</b></p><p>Used on sub-pages.</p>'
      }
    },
    {
      id: 'page-heading-shelf-1',
      type: 'page_heading_shelf',
      value: {
        heading: 'Move More',
        body: 'Moving is good for your body and mind. Try these easy ways to move more each day.',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'home-page'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf (No specific Jira story but will be needed on home page)',
        body: '<p>Type <b>page_heading_shelf</b>, Layout <b>full_width</b>, variant <b>sub-page</b></p><p>Used on the home page so needs to be hidden or out of view.</p>'
      }
    },
    {
      id: 'page-heading-shelf-2',
      type: 'page_heading_shelf',
      value: {
        heading: 'Move More',
        body: 'Moving is good for your body and mind. Try these easy ways to move more each day.',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'sub-page'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf (Jira Banner Shelf ON2-21)',
        body: 'Layout <b>full_width</b>, variant <b>promo</b>'
      }
    },
    {
      id: 'banner-shelf-1',
      type: 'banner_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        cta: {
          link_text: 'Download',
          link_external: 'http://www.edfs.co.uk'
        },
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'promo'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf (Jira Promo Shelf ON2-10)',
        body: 'Layout <b>cta_on_right</b>, variant <b>promo</b>'
      }
    },
    {
      id: 'promo-shelf-1',
      type: 'promo_shelf',
      value: {
        heading: 'html::How are <span class="marker">you</span>? Quiz',
        cta: {
          link_text: 'Have a go',
          link_external: 'http://www.edfs.co.uk'
        },
        meta_layout: 'cta_on_right',
        meta_variant: 'promo'
      }
    },
    {
      id: 'promo-shelf-2',
      type: 'promo_shelf',
      value: {
        heading: 'html::How are <span class="marker">you</span>? Quiz',
        cta: {
          link_text: 'Have a go',
          link_external: 'http://www.edfs.co.uk'
        },
        meta_layout: 'cta_on_left',
        meta_variant: 'promo'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf (Jira Promo Shelf ON2-10)',
        body: 'Layout <b>cta_on_right</b>, variant <b>promo</b>'
      }
    },
    {
      id: 'promo-shelf-3',
      type: 'promo_shelf',
      value: {
        heading: 'html::Tell us what <span class="marker">you</span> Think',
        cta: {
          link_text: 'Send a message',
          link_external: 'http://www.edfs.co.uk'
        },
        meta_layout: 'cta_on_right',
        meta_variant: 'promo'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Basic CTA Shelf (Not needed)',
        body: 'Layout <b>not given</b>, variant <b>extra-height</b>'
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
    }
  ]
};

export default withOwnContent(Page, sampleShelves);
