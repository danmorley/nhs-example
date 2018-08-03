import Page from './Page';
import withOwnContent from './withOwnContent';
import ImageUtils from '../panels/ImageUtils';
import testBackgroundImage from '../../assets/images/app-screen.jpg';
import pheLogo from '../../assets/images/public-health-england-logo.png';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */

const backgroundImage = {
  renditions: {
    desktop: testBackgroundImage,
    mobile: testBackgroundImage
  },
  title: 'Placeholder background image' };

const pheLogoImage = {
  renditions: {
    desktop: pheLogo,
    mobile: pheLogo
  },
  title: 'PHE logo image' };

const sampleShelvesPage = {
  title: 'Shelf Samples',
  page_styles: '#panel-video-teaser-4 h3 { color: orange; }',
  meta: {
    search_description: ''
  },
  body: [
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf (no body text)',
        body: 'Layout <b>not given</b>, variant <b>N/A</b>, background image <b>not given</b>, green gradient <b>no</b>, foreground image <b>not given</b>'
      }
    },
    {
      id: 'page-heading-shelf-1',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: '',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: false,
        mobile_use_renditions: true,
        background_image: null
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>not given</b>, variant <b>N/A</b>, background image <b>not given</b>, green gradient <b>no</b>, foreground image <b>not given</b>'
      }
    },
    {
      id: 'page-heading-shelf-2',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: false,
        mobile_use_renditions: true,
        background_image: null
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>not given</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>no</b>, foreground image <b>not given</b>'
      }
    },
    {
      id: 'page-heading-shelf-3',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: false,
        background_image: backgroundImage
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>not given</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>not given</b>'
      }
    },
    {
      id: 'page-heading-shelf-4',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>not given</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>given</b>'
      }
    },
    {
      id: 'page-heading-shelf-5',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage,
        image: pheLogoImage
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>image_bottom_left</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>given</b>'
      }
    },
    {
      id: 'page-heading-shelf-6',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage,
        image: pheLogoImage,
        meta_layout: "image_bottom_left"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>image_bottom_right</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>given</b>'
      }
    },
    {
      id: 'page-heading-shelf-7',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage,
        image: pheLogoImage,
        meta_layout: "image_bottom_right"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>image_top_right</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>given</b>'
      }
    },
    {
      id: 'page-heading-shelf-8',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage,
        image: pheLogoImage,
        meta_layout: "image_top_right"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Page Heading Shelf',
        body: 'Layout <b>image_top_left</b>, variant <b>N/A</b>, background image <b>given</b>, green gradient <b>yes</b>, foreground image <b>given</b>'
      }
    },
    {
      id: 'page-heading-shelf-9',
      type: 'page_heading_shelf',
      value: {
        heading: 'Page Heading shelf',
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        desktop_use_renditions: true,
        image_meta: "page_heading_shelf/None/None",
        meta_gradient: true,
        mobile_use_renditions: true,
        background_image: backgroundImage,
        image: pheLogoImage,
        meta_layout: "image_top_left"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Simple Page Heading Shelf (No body text)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      id: "simple-page-heading-shelf-1",
      type: "simple_page_heading_shelf",
      value: {
        heading: "Simple Page Heading Shelf",
        shelf_id: "",
        body: "",
        image_meta: "simple_page_heading_shelf/None/None"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Simple Page Heading Shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      id: "simple-page-heading-shelf-2",
      type: "simple_page_heading_shelf",
      value: {
        heading: "Simple Page Heading Shelf",
        shelf_id: "",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        image_meta: "simple_page_heading_shelf/None/None"
      }
    },


    {
      type: 'guidance_shelf',
      value: {
        heading: 'Information Panel',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
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
            id: 'information-panel-1a',
            type: 'information_panel',
            value: {
              heading: 'html::There\'s Only One <span class="marker">You</span>',
              body: '<p>Your health is important. It\'s not about doing the right thing - it\'s about making changes that fit your life to help feel your best. One You is all about finding that balance, and inspiring you with easy ways to help you feel great, every day.</p>',
              image: {
                title: 'Image name'
              },
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          }
        ]
      }
    },
    {
      id: 'grid-shelf-1-2',
      type: 'grid_shelf',
      value: {
        heading: 'Grid Shelf',
        rows_to_show: 1,
        items: [
          {
            id: 'cta-panel-1',
            type: 'cta_panel',
            value: {
              heading: 'This is CTA Panel',
              body: '<p>One You is all about finding that balance, and inspiring you with easy ways to help you feel great, every day.</p>',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          },
          {
            id: 'cta-panel-1',
            type: 'cta_panel',
            value: {
              heading: 'This is CTA Panel',
              body: '<p>One You is all about finding that balance, and inspiring you with easy ways to help you feel great, every day.</p>',
              cta: {
                link_text: 'Find out more',
                link_external: 'http://www.somewebsite.co.uk'
              }
            }
          }
        ]
      }
    },
    {
      id: 'grid-shelf-1',
      type: 'grid_shelf',
      value: {
        rows_to_show: 2,
        items: [
          {
            id: 'share-button-1a',
            type: 'share_button_panel',
            value: {
              social_links: [
                {
                  share_item: 'email',
                  share_text: 'This is the custom text for the email sharing link'
                },
                {
                  share_item: 'whatsapp',
                  share_text: 'This is the custom text for the whatsapp sharing link'
                },
                {
                  share_item: 'facebook',
                  share_text: 'This is the custom text for the facebook sharing link'
                },
                {
                  share_item: 'twitter',
                  share_text: 'This is the custom text for the twitter sharing link'
                }
              ],
              meta_variant: "align-right"
            }
          }
        ]
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Iframe Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'iframe-shelf-1',
      type: 'iframe_shelf',
      value: {
        src: 'https://www.nhs.uk/oneyou/how-are-you',
        height: '1000px',
        field_id: 'how-are-you'
      }
    },
    {
      type: 'script_shelf',
      value: {
        script: 'console.log("This is output by some inline javascript!");'
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
                title: 'Image name'
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
              }
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
              cta: [ {
                link_text: 'Link 1 text',
                link_external: 'http://www.edfs.co.uk'
              }]
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
                title: 'Image name'
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
              }
            }
          }
        ]
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
        field_id: 'test-section-heading-1'
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
        field_id: 'test-section-heading-2'
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

export default withOwnContent(Page, sampleShelvesPage);
