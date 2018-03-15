import Page from '../Page';
import withOwnContent from './withOwnContent';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
const sampleShelves = {
  title: 'Shelf Samples',
  page_styles: '#panel-video-teaser-4 h3 { color: orange; }',
  body: [
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
              body: '<p>Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app</p>',
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
              body: '<p>Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app</p>',
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
        body: '<p>Layout <b>not given</b>, variant <b>not given</b></p><p>Contains examples of VideoTeaserPanel, Oneyou1TeaserPanel and AppTeaserPanel</p>'
      }
    },
    {
      id: 'grid-shelf-1',
      type: 'grid_shelf',
      value: {
        heading: 'Responsive Grid Shelf',
        rows_to_show: 2,
        items: [
          {
            id: 'video-teaser-1',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk 2',
              body: '<p>Share walking stories and your progress with others online</p>',
              image: {
                title: 'Image name',
              },
              video: '5520584848001',
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
              body: '<p>Share walking stories and your progress with others online</p>',
              video: '5669668082001',
              image: {
                title: 'Valid image with broken URL',
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
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: '<p>Share walking stories and your progress with others online</p>',
              video: '',
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
              body: '<p>Share walking stories and your progress with others online</p>',
              image: {
                title: 'IMage name'
              },
              video: '123456',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.edfs.co.uk'
              }
            }
          },
          {
            id: 'app-teaser-1',
            type: 'app_teaser',
            value: {
              heading: 'html::Download the  <strong><span class="text-color--secondary">Wellmind</span> App</strong>',
              body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>',
              image: {
                title: 'Image name'
              },
              cta_appstore: {
                link_external: 'http://www.edfs.co.uk'
              },
              cta_googleplay: {
                link_external: 'https://play.google.com/store/apps/details?id=com.bluestepsolutions.wellmind&hl=en_GB'
              },
            }
          },
          {
            id: 'oneyou1-teaser-1',
            type: 'oneyou1_teaser',
            value: {
              heading: 'Be Active With a Disability',
              body: '<p>There are so many ways to move - whatever your situation. Get ideas on the EDFS website</p>',
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
                  link_page: 6
                },
                {
                  link_text: 'Link 3 text',
                  link_external: 'http://www.edfs.co.uk'
                }
              ]
            }
          },
          {
            id: 'oneyou2-teaser-2',
            type: 'oneyou1_teaser',
            value: {
              heading: 'Be Active With a Disability',
              body: '<p>There are so many ways to move - whatever your situation. Get ideas on the EDFS website</p>',
              cta: {
                link_text: 'Link 1 text',
                link_external: 'http://www.edfs.co.uk'
              },
            }
          },
          {
            id: 'image-teaser-1',
            type: 'image_teaser',
            value: {
              heading: 'Walk the walk, talk the talk',
              body: '<p>Share walking stories and your progress with others online</p><p>This is an Image Teaser panel.</p>',
              image: {
                title: 'Image name'
              },
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.edfs.co.uk'
              },
              meta_variant: 'dark-bg'
            }
          },
          {
            id: 'image-teaser-2',
            type: 'image_teaser',
            value: {
              heading: 'Smoking and you',
              body: '<p>Share walking stories and your progress with others online</p><p>This is a learn more  panel.</p>',
              image: {
                title: 'Image name'
              },
              meta_variant: 'light-bg'
            }
          }
        ],
        meta_variant: 'blue_background'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Full Width Grid Shelf',
        body: '<p>Layout <b>full_width</b>, variant <b>not given</b></p>'
      }
    },
    {
      id: 'grid-shelf-2',
      type: 'grid_shelf',
      value: {
        heading: 'Full Width Grid Shelf',
        rows_to_show: 1,
        meta_layout: 'full_width',
        items: [
          {
            id: 'video-teaser-1a',
            type: 'video_teaser',
            value: {
              heading: 'Walk the walk, talk the talk 2',
              body: '<p>Share walking stories and your progress with others online</p>',
              image: {
                title: 'Image name',
              },
              video: '5520584848001',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              },
              meta_variant: 'yellow'
            }
          },
          {
            id: 'app-teaser-1a',
            type: 'app_teaser',
            value: {
              heading: 'html::Download the  <strong><span class="text-color--secondary">Wellmind</span> App</strong>',
              body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>',
              image: {
                title: 'Image name'
              },
              cta_appstore: {
                link_external: 'http://www.edfs.co.uk'
              },
              cta_googleplay: {
                link_external: 'https://play.google.com/store/apps/details?id=com.bluestepsolutions.wellmind&hl=en_GB'
              },
            }
          },
          {
            id: 'information-panel-1a',
            type: 'information_panel',
            value: {
              heading: 'html::There\'s Only <em>One</em>  <span class="marker">You</span>',
              body: '<p>Your health is important. It\'s not about doing the right thing - it\'s about making changes that fit your life to help feel your best. One You is all about finding that balance, and inspiring you with easy ways to help you feel great, every day.</p>',
              image: {
                title: 'Image name',
              },
              video: '5520584848001',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          }
        ]
      },
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
        meta_layout: 'full_to_half_width'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Section Heading Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
       id: 'section-heading-shelf-1',
       type: 'section_heading_shelf',
       value: {
           heading: 'This is a section heading',
           field_id: 'test-section-heading-1',
       }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Section Heading Shelf (with body text)',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
       id: 'section-heading-shelf-2',
       type: 'section_heading_shelf',
       value: {
           heading: 'This is a section heading',
           body: '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>',
           field_id: 'test-section-heading-2',
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
        body: '<p>Moving is good for your body and mind. Try these easy ways to move more each day.</p>',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'page_header',
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
        body: '<p>Moving is good for your body and mind. Try these easy ways to move more each day.</p>',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'page_header',
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
        body: '<p>Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app</p>',
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
        body: '<p>Layout <b>cta_on_right</b>, variant <b>promo</b></p>'
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
        body: '<p>Layout <b>cta_on_right</b>, variant <b>promo</b></p>'
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
