import Page from './Page';
import withOwnContent from './withOwnContent';
import ImageUtils from '../panels/ImageUtils';
import testBackgroundImage from '../../assets/images/app-screen.jpg';
import testImage from '../../assets/images/test-image.jpg';
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

const altImage = {
  renditions: {
    desktop: testImage,
    mobile: testImage
  },
  title: 'Alternate placeholder background image'
};

const pheLogoImage = {
  renditions: {
    desktop: pheLogo,
    mobile: pheLogo
  },
  title: 'PHE logo image' };

const BASKET_KEY = 'basket';
const ACTION_PLAN_KEY = 'action_plan';

sessionStorage.setItem(BASKET_KEY, JSON.stringify(['action_1']));
sessionStorage.setItem(ACTION_PLAN_KEY, JSON.stringify({"action_1": {
                    action_code: "action_1",
                    title: "Action 1",
                    rich_text_body: "",
                    cta: [ ],
                    panel_id: ""
                  }}));

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
        heading: 'Note',
        body: 'Viewing this page automatically adds an item to your action plan in order for the Action Plan display example to work. The reset button in the action plan builder example can be used to clear this.'
      }
    },
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
        heading: 'Section Heading Shelf (No body text)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      id: "section-heading-shelf-1",
      type: "section_heading_shelf",
      value: {
        heading: 'Section Heading Shelf',
        shelf_id: "",
        body: '',
        image_meta: "section_heading_shelf/None/None"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Section Heading Shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      id: "section-heading-shelf-2",
      type: "section_heading_shelf",
      value: {
        heading: 'Section Heading Shelf',
        shelf_id: "",
        body: '<p>PBR&B authentic pickled gastropub, typewriter echo park poke swag pitchfork austin mustache yr photo booth lyft. Before they sold out mixtape next level wolf, truffaut squid ennui helvetica blog. Viral ramps yuccie fingerstache street art art party humblebrag. Tilde craft beer meggings green juice vice ramps pitchfork freegan. Umami migas forage, fingerstache raclette normcore blue bottle. Literally chicharrones twee, unicorn palo santo mustache iPhone biodiesel. Leggings 8-bit tacos actually.</p>',
        image_meta: "section_heading_shelf/None/None"
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Carousel Shelf - Video Teaser (Brightcove)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-1-16"
          }
        ],
        shelf_id: "",
        image_meta: "carousel_shelf/None/None"
      },
      id: "carousel-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Carousel Shelf - Video Teaser (Wirewax)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "carousel-video-teaser-2-16"
          }
        ],
        shelf_id: "",
        image_meta: "carousel_shelf/None/None"
      },
      id: "carousel-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Carousel Shelf - Banner shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>no</b>, CTA <b>not given</b>',
              background_image: null,
              meta_gradient: false,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: null,
                link_external: null
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-1"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>no</b>, CTA <b>not given</b>',
              background_image: backgroundImage,
              meta_gradient: false,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: null,
                link_external: null
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-2"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>yes</b>, CTA <b>not given</b>',
              background_image: backgroundImage,
              meta_gradient: true,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: null,
                link_external: null
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-3"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>no</b>, CTA <b>given</b>',
              background_image: backgroundImage,
              meta_gradient: false,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: "Google",
                link_external: "www.google.co.uk"
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-4"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>yes</b>, CTA <b>given</b>',
              background_image: backgroundImage,
              meta_gradient: true,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: "Google",
                link_external: "www.google.co.uk"
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-5"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>given</b>, CTA <b>not given</b>',
              background_image: null,
              meta_gradient: true,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: null,
                link_external: null
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-6"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>given</b>, CTA <b>given</b>',
              background_image: null,
              meta_gradient: true,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: "Google",
                link_external: "www.google.co.uk"
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-7"
          },
          {
            type: "banner_shelf",
            value: {
              heading: "Banner Shelf",
              body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>not given</b>, CTA <b>given</b>',
              background_image: null,
              meta_gradient: false,
              shelf_id: "none",
              meta_layout: "full_width",
              meta_variant: "main-banner",
              cta: {
                link_text: "Google",
                link_external: "www.google.co.uk"
              },
              image_meta: "banner_shelf/carousel_shelf/None"
            },
            id: "carousel-banner-8"
          }
        ],
        shelf_id: "",
        image_meta: "carousel_shelf/None/None"
      },
      id: "carousel-3"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Carousel Shelf - App teaser',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-1"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-2"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-3"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-4"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-5"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-6"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/carousel_shelf/None"
            },
            id: "carousel-app-teaser-7"
          }
        ],
        shelf_id: "",
        image_meta: "carousel_shelf/None/None"
      },
      id: "carousel-4"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Panel Carousel Shelf - Video Teaser (Brightcove)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "panel_carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "brightcove",
              heading: "Video Teaser (Brightcove)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-1-16"
          }
        ],
        shelf_id: "",
        image_meta: "panel_carousel_shelf/None/None"
      },
      id: "panel-carousel-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Panel Carousel Shelf - Video Teaser (Wirewax)',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "panel_carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser (Wirewax)",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "panel-carousel-video-teaser-2-16"
          }
        ],
        shelf_id: "",
        image_meta: "panel_carousel_shelf/None/None"
      },
      id: "panel-carousel-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Panel Carousel Shelf - App teaser',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "panel_carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-1"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-2"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-3"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-4"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-5"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-6"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/panel_carousel_shelf/None"
            },
            id: "panel-carousel-app-teaser-7"
          }
        ],
        shelf_id: "",
        image_meta: "panel_carousel_shelf/None/None"
      },
      id: "panel-carousel-3"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Panel Carousel Shelf - Inspiration teaser',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "panel_carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-1"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-2"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-3"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-4"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-5"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-6"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-7"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-8"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-9"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-10"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-11"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-12"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-13"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-14"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-15"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-17"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-18"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-19"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-20"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-21"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-22"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-23"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-24"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-25"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-26"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-27"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-28"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-29"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-30"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-31"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-32"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-33"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-34"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-35"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-36"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-37"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "panel-carousel-image-panel-38"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-39"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-40"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-41"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-42"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-43"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-44"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-45"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-46"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-47"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "panel-carousel-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>, Audio <b>given</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link",
              audio: "http://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3"
            },
            id: "panel-carousel-image-panel-49"
          }
        ],
        shelf_id: "",
        image_meta: "panel_carousel_shelf/None/None"
      },
      id: "panel-carousel-4"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Panel Carousel Shelf - CTA Panel',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b> <br/><i>(See panel bodies for panel variant details)</i>'
      }
    },
    {
      type: "panel_carousel_shelf",
      value: {
        heading: "",
        items: [
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: "CTA <b>not given</b>",
              cta: [],
              shelf_id: "",
              image_meta: "cta_panel/panel_carousel_shelf/None"
            },
            id: "panel-carousel-cta-panel-1"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: "CTA <b>given</b>",
              cta: [
                {
                  type: "simple_cta_link",
                  value: {
                    link_text: "Google",
                    link_external: "www.google.co.uk",
                    link_page: { }
                  },
                  id: "5725e643-0b0c-4662-a6d4-a0c6056f306f"
                }
              ],
              shelf_id: "",
              image_meta: "cta_panel/panel_carousel_shelf/None"
            },
            id: "panel-carousel-cta-panel-2"
          }
        ],
        shelf_id: "",
        image_meta: "panel_carousel_shelf/None/None"
      },
      id: "panel-carousel-5"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'CTA <b>not given</b>, Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "promo_shelf",
      value: {
        heading: "Stoptober",
        shelf_id: "stoptober",
        meta_layout: "cta_on_right",
        meta_variant: "how-are-you",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "promo_shelf/None/None"
      },
      id: "promo-shelf-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'CTA <b>given</b>, Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "promo_shelf",
      value: {
        heading: "Stoptober",
        shelf_id: "stoptober",
        meta_layout: "cta_on_right",
        meta_variant: "how-are-you",
        cta: {
          link_text: "Google",
          link_external: "www.google.co.uk",
          link_page: { }
        },
        image_meta: "promo_shelf/None/None"
      },
      id: "promo-shelf-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>not given</b>, Background Image <b>not given</b>, Green Gradient <b>no</b>, CTA <b>not given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: '',
        background_image: null,
        meta_gradient: false,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>no</b>, CTA <b>not given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: null,
        meta_gradient: false,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>no</b>, CTA <b>not given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: backgroundImage,
        meta_gradient: false,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-3"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>yes</b>, CTA <b>not given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: backgroundImage,
        meta_gradient: true,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-4"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>no</b>, CTA <b>given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: backgroundImage,
        meta_gradient: false,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: "Google",
          link_external: "www.google.co.uk"
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-5"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>given</b>, Green Gradient <b>yes</b>, CTA <b>given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: backgroundImage,
        meta_gradient: true,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: "Google",
          link_external: "www.google.co.uk"
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-6"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>given</b>, CTA <b>not given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: null,
        meta_gradient: true,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: null,
          link_external: null
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-7"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>given</b>, CTA <b>given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: null,
        meta_gradient: true,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: "Google",
          link_external: "www.google.co.uk"
        },
        image_meta: "banner_shelf/carousel_shelf/None"
      },
      id: "banner-8"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Banner Shelf',
        body: 'Body <b>given</b>, Background Image <b>not given</b>, Green Gradient <b>not given</b>, CTA <b>given</b>'
      }
    },
    {
      type: "banner_shelf",
      value: {
        heading: "Banner Shelf",
        body: 'Pickled tilde taxidermy, messenger bag synth fixie venmo. Pickled sartorial leggings biodiesel letterpress DIY. Lumbersexual glossier sartorial leggings, try-hard lo-fi trust fund.',
        background_image: null,
        meta_gradient: false,
        shelf_id: "none",
        meta_layout: "full_width",
        meta_variant: "main-banner",
        cta: {
          link_text: "Google",
          link_external: "www.google.co.uk"
        },
        image_meta: "banner_shelf/None/None"
      },
      id: "carousel-banner-8"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>not given</b>, Variant <b>standard</b>, Layout <b>full width</b> Image display <b>stretch</b> <br/> <i>See individual panels for their settings</i>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: 'full-grid-one-you-1'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: 'full-grid-one-you-2'
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "full-grid-video-teaser-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-1"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-2"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-3"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-4"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-5"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-6"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-7"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-8"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-9"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-10"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-11"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-12"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-13"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-14"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-15"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-17"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-18"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-19"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-20"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-21"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-22"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-23"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-24"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-25"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-26"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-27"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-28"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-29"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-30"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-31"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-32"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-33"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-34"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-35"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-36"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-37"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "full-grid-image-panel-38"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-39"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-40"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-41"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-42"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-43"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-44"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-45"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-46"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-47"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "full-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>, Audio <b>given</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link",
              audio: "http://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3"
            },
            id: "full-grid-image-panel-49"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-1"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-2"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-3"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-4"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-5"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-6"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "full-grid-app-teaser-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-1"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-2"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-3"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-4"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-5"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-6"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "full-grid-information-panel-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-1"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-2"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-3"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_right"
            },
            id: "full-grid-icon-card-5"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon heading left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_left"
            },
            id: "full-grid-icon-card-6"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon heading right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_right"
            },
            id: "full-grid-icon-card-7"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon body left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_left"
            },
            id: "full-grid-icon-card-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon body right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_right"
            },
            id: "full-grid-icon-card-9"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on top</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_top"
            },
            id: "full-grid-icon-card-10"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on bottom</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_bottom"
            },
            id: "full-grid-icon-card-11"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard heading standard body grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>large green heading standard body grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_green_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>extra small heading large body no background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "x_small_heading_large_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>large yellow heading standard body no background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_yellow_heading_standard_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "full-grid-icon-card-4"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>not given</b>',
              cta: [ ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "full-grid-cta-panel-1"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>given</b>',
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "full-grid-cta-panel-2"
          },
          {
            type: "list_item_panel",
            value: {
              text: "List Item Panel",
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "full-grid-list-panel-1"
          },
          {
            type: "list_item_panel",
            value: {
              text: 'No configuration currently available',
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "full-grid-list-panel-2"
          }
        ],
        background_image: {
          title: null,
          renditions: { }
        },
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "standard",
        meta_layout: "full_width",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-1'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>not given</b>, Variant <b>standard</b>, Layout <b>2 columns</b> Image display <b>stretch</b> <br/> <i>See individual panels for their settings</i>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: '2-grid-one-you-1'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: '2-grid-one-you-2'
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "2-grid-video-teaser-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-1"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-2"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-3"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-4"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-5"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-6"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-7"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-8"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-9"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-10"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-11"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-12"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-13"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-14"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-15"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-17"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-18"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-19"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-20"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-21"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-22"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-23"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-24"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-25"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-26"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-27"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-28"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-29"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-30"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-31"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-32"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-33"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-34"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-35"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-36"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-37"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "2-grid-image-panel-38"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-39"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-40"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-41"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-42"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-43"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-44"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-45"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-46"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-47"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "2-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>, Audio <b>given</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link",
              audio: "http://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3"
            },
            id: "2-grid-image-panel-49"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-1"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-2"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-3"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-4"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-5"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-6"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "2-grid-app-teaser-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-1"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-2"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-3"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-4"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-5"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-6"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "2-grid-information-panel-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-1"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-2"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-3"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_right"
            },
            id: "2-grid-icon-card-5"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon heading left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_left"
            },
            id: "2-grid-icon-card-6"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon heading right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_right"
            },
            id: "2-grid-icon-card-7"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon body left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_left"
            },
            id: "2-grid-icon-card-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon body right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_right"
            },
            id: "2-grid-icon-card-9"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on top</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_top"
            },
            id: "2-grid-icon-card-10"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>standard on grey background</b>, Layout <b>icon on bottom</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_bottom"
            },
            id: "2-grid-icon-card-11"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard heading standard<br/> body grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>large green heading standard<br/> body grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_green_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>extra small heading <br/>large body no background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "x_small_heading_large_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>large yellow heading <br/>standard body no background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_yellow_heading_standard_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "2-grid-icon-card-4"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>not given</b>',
              cta: [ ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "2-grid-cta-panel-1"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>given</b>',
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "2-grid-cta-panel-2"
          },
          {
            type: "list_item_panel",
            value: {
              text: "List Item Panel",
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "2-grid-list-panel-1"
          },
          {
            type: "list_item_panel",
            value: {
              text: 'No configuration currently available',
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "2-grid-list-panel-2"
          }
        ],
        background_image: {
          title: null,
          renditions: { }
        },
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "standard",
        meta_layout: "2_col_1_on_mobile",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-2'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>not given</b>, Variant <b>standard</b>, Layout <b>3 columns</b> Image display <b>stretch</b> <br/> <i>See individual panels for their settings</i>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: '3-grid-one-you-1'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: '3-grid-one-you-2'
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-1"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-2"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-3"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-4"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-5"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-6"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-7"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Left</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_left",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-8"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-9"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-10"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-11"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Left</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_left",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-12"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-13"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>not given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [ ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-14"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>No</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: false,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-15"
          },
          {
            type: "video_teaser",
            value: {
              image_meta: "video_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              host: "wirewax",
              heading: "Video Teaser",
              body: 'Image Mobile <b>Top</b>, Image Desktop <b>Top</b>, Use play link <b>Yes</b>, CTA <b>given</b>',
              image: backgroundImage,
              video: "1234",
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_layout_mobile: "mobile_image_top",
              meta_layout_desktop: "desktop_image_top",
              meta_use_play_link: true,
              meta_play_link_text: "Play"
            },
            id: "3-grid-video-teaser-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-1"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-2"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-3"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-4"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-5"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-6"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-7"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-8"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-9"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-10"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-11"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-12"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-13"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-14"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-15"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-16"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-17"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-18"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-19"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-20"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-21"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-22"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-23"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-24"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-25"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-26"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-27"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-28"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-29"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-30"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-31"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-32"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-33"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-34"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-35"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-36"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-37"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>button</b>",
              image: null,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "button"
            },
            id: "3-grid-image-panel-38"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-39"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-40"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-41"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-42"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-43"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>dark background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "dark-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-44"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-45"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>left</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-left",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-46"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>default</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-47"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>top</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-top",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/grid_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>left</b>, CTA style <b>link</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-left",
              meta_cta_variant: "link"
            },
            id: "3-grid-image-panel-48"
          },
          {
            type: "image_teaser",
            value: {
              image_meta: "image_teaser/panel_carousel_shelf/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Inspiration Teaser",
              body: "Image <b>not given</b>, CTA <b>not given</b>, Variant <b>light background</b>, Mobile image position <b>default</b>, Desktop image position <b>default</b>, CTA style <b>link</b>, Audio <b>given</b>",
              image: null,
              cta: [],
              shelf_id: "",
              meta_variant: "light-bg",
              meta_layout_mobile: "mobile-image-default",
              meta_layout_desktop: "desktop-image-default",
              meta_cta_variant: "link",
              audio: "http://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3"
            },
            id: "3-grid-image-panel-49"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-1"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>not given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-2"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-3"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: altImage,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-4"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>not given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: null
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-5"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-6"
          },
          {
            type: "app_teaser",
            value: {
              heading: "App teaser",
              body: 'Image <b>not given</b>, App store link <b>not given</b>, Google Play link <b>given</b>',
              image: null,
              shelf_id: null,
              cta_appstore: {
                link_text: "",
                link_external: null
              },
              cta_googleplay: {
                link_text: "",
                link_external: "www.google.co.uk"
              },
              image_meta: "app_teaser/grid_shelf/None"
            },
            id: "3-grid-app-teaser-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-1"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-2"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-3"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image top text right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-4"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-5"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>not given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [ ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-6"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>not given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-7"
          },
          {
            type: "information_panel",
            value: {
              image_meta: "information_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Information Panel",
              body: 'Image <b>given</b>, CTA <b>given</b>, Variant <b>mobile image right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              meta_variant: "mobile-image-top-text-right"
            },
            id: "3-grid-information-panel-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>not given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-1"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>not given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-2"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>not given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on left</b>',
              image: {
                title: null,
                renditions: { }
              },
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-3"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_right"
            },
            id: "3-icon-card-5"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon heading left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_left"
            },
            id: "3-icon-card-6"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon heading right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_heading_right"
            },
            id: "3-icon-card-7"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon body left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_left"
            },
            id: "3-icon-card-8"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon body right</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_body_right"
            },
            id: "3-icon-card-9"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on grey background</b>,<br/> Layout <b>icon on top</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_top"
            },
            id: "3-icon-card-10"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard on <br/>grey background</b>,<br/> Layout <b>icon on bottom</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_bottom"
            },
            id: "3-icon-card-11"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>standard heading<br/> standard body grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "standard_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>large green heading <br/>standard body grey background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_green_heading_standard_body_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>extra small heading <br/>large body no background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "x_small_heading_large_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-4"
          },
          {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: 'Image <b>given</b>, CTA <b>given</b>,<br/> Variant <b>large yellow heading <br/>standard body no background</b>,<br/> Layout <b>icon on left</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              panel_id: "",
              meta_variant: "large_yellow_heading_standard_body_no_bg",
              meta_layout: "icon_on_left"
            },
            id: "3-icon-card-4"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>not given</b>',
              cta: [ ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "3-grid-cta-panel-1"
          },
          {
            type: "cta_panel",
            value: {
              heading: "CTA Panel",
              body: 'CTA <b>given</b>',
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk",
                  link_page: { }
                }
              ],
              shelf_id: "",
              image_meta: "cta_panel/grid_shelf/full_width"
            },
            id: "3-grid-cta-panel-2"
          },
          {
            type: "list_item_panel",
            value: {
              text: "List Item Panel",
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "3-grid-list-panel-1"
          },
          {
            type: "list_item_panel",
            value: {
              text: 'No configuration currently available',
              image_meta: "list_item_panel/grid_shelf/full_width"
            },
            id: "3-grid-list-panel-2"
          }
        ],
        background_image: {
          title: null,
          renditions: { }
        },
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "standard",
        meta_layout: "3_col_1_on_mobile",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-3'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>given</b>, Variant <b>standard</b>, Layout <b>2 columns</b> Image display <b>stretch</b>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: 'grid-4-panel-2'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: 'grid-4-panel-2'
          }
        ],
        background_image: backgroundImage,
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "standard",
        meta_layout: "2_col_1_on_mobile",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-4'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>given</b>, Variant <b>standard</b>, Layout <b>2 columns</b> Image display <b>contain</b>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: 'grid-5-panel-2'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: 'grid-5-panel-2'
          }
        ],
        background_image: backgroundImage,
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "standard",
        meta_layout: "2_col_1_on_mobile",
        meta_image_display: "contain",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-5'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>not given</b>, Variant <b>teal background on desktop, white on mobile</b>, Layout <b>2 columns</b> Image display <b>stretch</b>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: 'grid-6-panel-2'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: 'grid-6-panel-2'
          }
        ],
        background_image: null,
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "teal_background",
        meta_layout: "2_col_1_on_mobile",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-6'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Grid Shelf',
        body: 'Background Image <b>not given</b>, Variant <b>yellow background, red border</b>, Layout <b>2 columns</b> Image display <b>stretch</b>'
      }
    },
    {
      type: "grid_shelf",
      value: {
        heading: "",
        body: '',
        items: [
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>not given</b>',
              image: altImage,
              cta: [ ],
              shelf_id: ""
            },
            id: 'grid-7-panel-2'
          },
          {
            type: "oneyou1_teaser",
            value: {
              image_meta: "oneyou1_teaser/grid_shelf/full_width",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "One you teaser",
              body: 'Body <b>given</b>, CTA <b>given</b>',
              image: altImage,
              cta: [
                {
                  link_text: "Google",
                  link_external: "www.google.co.uk"
                }
              ],
              shelf_id: ""
            },
            id: 'grid-7-panel-2'
          }
        ],
        background_image: null,
        shelf_id: "",
        rows_to_show: 0,
        meta_variant: "yellow_background",
        meta_layout: "2_col_1_on_mobile",
        meta_image_display: "cover",
        image_meta: "grid_shelf/None/None"
      },
      id: 'grid-shelf-7'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Recipe Grid Shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "recipe_grid_shelf",
      value: {
        heading: "Recipe Grid",
        items: [
          {
            type: "recipe_teaser",
            value: {
              heading: "Recipe Teaser - Background image given, link given",
              page_link: "/oneyou/",
              background_image: altImage,
              shelf_id: null,
              image_meta: "recipe_teaser/recipe_grid_shelf/None"
            },
            id: "recipe-grid-recipe-teaser-1"
          },
          {
            type: "recipe_teaser",
            value: {
              heading: "Recipe Teaser - Background image not given, link given",
              page_link: "/oneyou/",
              background_image: null,
              shelf_id: null,
              image_meta: "recipe_teaser/recipe_grid_shelf/None"
            },
            id: "recipe-grid-recipe-teaser-2"
          },
          {
            type: "recipe_teaser",
            value: {
              heading: "Recipe Teaser - Background image given, link not given",
              page_link: null,
              background_image: altImage,
              shelf_id: null,
              image_meta: "recipe_teaser/recipe_grid_shelf/None"
            },
            id: "recipe-grid-recipe-teaser-3"
          },
          {
            type: "recipe_teaser",
            value: {
              heading: "Recipe Teaser - Background image not given, link not given",
              page_link: null,
              background_image: null,
              shelf_id: null,
              image_meta: "recipe_teaser/recipe_grid_shelf/None"
            },
            id: "recipe-grid-recipe-teaser-4"
          }
        ],
        shelf_id: "",
        rows_to_show: 0,
        meta_image_display: "cover",
        image_meta: "recipe_grid_shelf/None/None"
      },
      id: "recipe-grid-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Link Shelf',
        body: 'CTA <b>not given</b>, Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "find_out_more_dropdown",
      value: {
        image_meta: "find_out_more_dropdown/None/None",
        mobile_use_renditions: true,
        desktop_use_renditions: true,
        heading: "Link Dropdown",
        cta: [ ],
        shelf_id: ""
      },
      id: "ac27f961-2745-4990-8beb-ac6ab0d1be02"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Link Shelf',
        body: 'CTA <b>given</b>, Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "find_out_more_dropdown",
      value: {
        image_meta: "find_out_more_dropdown/None/None",
        mobile_use_renditions: true,
        desktop_use_renditions: true,
        heading: "Link Dropdown",
        cta: [
          {
            link_text: "Google",
            link_external: "www.google.co.uk",
            link_page: { }
          }
        ],
        shelf_id: ""
      },
      id: "ac27f961-2745-4990-8beb-ac6ab0d1be02"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Iframe Shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>'
      }
    },
    {
      type: 'iframe_shelf',
      value: {
        src: 'https://www.nhs.uk/oneyou/how-are-you',
        height: '1000px',
        field_id: 'how-are-you'
      },
      id: 'iframe-shelf-1'
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Divider Shelf',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, green gradient <b>N/A</b>, foreground image <b>N/A</b>'
      }
    },
    {
      type: "divider",
      value: {
        shelf_id: "",
        image_meta: "divider/None/None"
      },
      id: "divider-1"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Article Page Heading',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, back button <b>not given</b>'
      }
    },
    {
      type: "article_page_heading_shelf",
      value: {
        heading: "Article Page Heading",
        display_back_button: false,
        back_button_label: null,
        image_meta: "article_page_heading_shelf/None/None"
      },
      id: "article-page-heading-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Article Page Heading',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>, back button <b>given</b>'
      }
    },
    {
      type: "article_page_heading_shelf",
      value: {
        heading: "Article Page Heading",
        display_back_button: true,
        back_button_label: "Back",
        image_meta: "article_page_heading_shelf/None/None"
      },
      id: "article-page-heading-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Table Shelf',
        body: 'Layout <b>N/A</b>, variant <b>standard</b>, background image <b>N/A</b>, show headings <b>false</b>'
      }
    },
    {
      type: "table",
      value: {
        header: [
          "Column 1",
          "Column 2"
        ],
        display_header: false,
        body_rows: [
          [
            {
              type: "simple_text_panel",
              value: {
                text: "Table Shelf"
              },
              id: "table-2-simple-text-panel-1"
            },
            {
              type: "simple_text_panel",
              value: {
                text: "Simple text Panel"
              },
              id: "table-2-simple-text-panel-2"
            }
          ],
          [
            {
              type: "rich_text_panel",
              value: {
                text: "<p>Rich Text Panel</p>"
              },
              id: "table-2-rich-text-panel-1"
            },
            {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/table/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: "",
              image: pheLogoImage,
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "table-2-icon-card-panel-1"
            }
          ]
        ],
        shelf_id: "",
        meta_variant: "standard",
        image_meta: "table/None/None"
      },
      id: "table-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Table Shelf',
        body: 'Layout <b>N/A</b>, variant <b>standard</b>, background image <b>N/A</b>, show headings <b>true</b>'
      }
    },
    {
      type: "table",
      value: {
        header: [
          "Column 1",
          "Column 2"
        ],
        display_header: true,
        body_rows: [
          [
            {
              type: "simple_text_panel",
              value: {
                text: "Table Shelf"
              },
              id: "table-2-simple-text-panel-1"
            },
            {
              type: "simple_text_panel",
              value: {
                text: "Simple text Panel"
              },
              id: "table-2-simple-text-panel-2"
            }
          ],
          [
            {
              type: "rich_text_panel",
              value: {
                text: "<p>Rich Text Panel</p>"
              },
              id: "table-2-rich-text-panel-1"
            },
            {
            type: "icon_card_panel",
            value: {
              image_meta: "icon_card_panel/table/None",
              mobile_use_renditions: true,
              desktop_use_renditions: true,
              heading: "Icon card",
              body: "",
              image: pheLogoImage,
              cta: [ ],
              panel_id: "",
              meta_variant: "standard_grey_bg",
              meta_layout: "icon_on_left"
            },
            id: "table-2-icon-card-panel-1"
            }
          ]
        ],
        shelf_id: "",
        meta_variant: "standard",
        image_meta: "table/None/None"
      },
      id: "table-2"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Action Plan Builder',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>'
      }
    },
    {
      type: "action_plan_shelf",
      value: {
        action_groups: [
          {
            type: "action_group",
            value: {
              title: "Action Group 1",
              actions: [
                {
                  type: "action_panel",
                  value: {
                    action_code: "action_1",
                    title: "Action 1",
                    rich_text_body: "",
                    cta: [ ],
                    panel_id: ""
                  },
                  id: "action-1"
                },
                {
                  type: "action_panel",
                  value: {
                    action_code: "action_2",
                    title: "Action 2",
                    rich_text_body: "",
                    cta: [ ],
                    panel_id: ""
                  },
                  id: "action-2"
                }
              ],
              panel_id: ""
            },
            id: "action-group-1"
          },
          {
            type: "action_group",
            value: {
              title: "Action Group 2",
              actions: [
                {
                  type: "action_panel",
                  value: {
                    action_code: "action_3",
                    title: "Action 3",
                    rich_text_body: "",
                    cta: [ ],
                    panel_id: ""
                  },
                  id: "action-3"
                }
              ],
              panel_id: ""
            },
            id: "action-group-2"
          }
        ],
        cta: [
          {
            type: "simple_menu_item",
            value: {
              link_text: "Build Your Plan",
              link_external: "www.google.co.uk",
              link_page: null
            },
            id: "cta-link"
          }
        ],
        shelf_id: "",
        image_meta: "action_plan_shelf/None/None"
      },
      id: "action-plan-builder"
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Action Plan Display',
        body: 'Layout <b>N/A</b>, variant <b>N/A</b>, background image <b>N/A</b>'
      }
    },
    {
      type: "action_plan_display_shelf",
      value: {
        shelf_id: "",
        title: "Action Plan Display",
        body: "<p>Lorem ipsum dolor amet humblebrag tousled mixtape chia pop-up tbh DIY direct trade before they sold out kickstarter austin chicharrones pour-over ethical.</p>",
        cta: [ ],
        image_meta: "action_plan_display_shelf/None/None"
      },
      id: "cdc8117f-cdb1-41dd-a73a-589aa2c5f8d6"
    }
  ]
};

export default withOwnContent(Page, sampleShelvesPage);
