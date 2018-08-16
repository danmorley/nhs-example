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
          }
          ,
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
