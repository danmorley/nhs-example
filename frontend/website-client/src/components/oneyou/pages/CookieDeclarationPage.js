import Page from '../../base/pages/Page';
import withOwnContent from './withOwnContent';
import './cookie-declaration.css';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
const cookieDeclarationPage = {
  title: 'Cookie Declaration',
  meta: {
    search_description: ''
  },
  body: [
    {
      id: 'site-map-shelf',
      type: 'page_heading_shelf',
      value: {
        heading: 'Cookie Declaration',
        meta_layout: 'page_header'
      }
    },
    {
      type: 'script_shelf',
      value: {
        id: 'CookieDeclaration',
        meta_variant: 'cookie-dec',
        src: 'https://consent.cookiebot.com/9d5293f5-cb06-4c3c-a81c-58ac270dec41/cd.js'
      }
    }
  ]
};

export default withOwnContent(Page, cookieDeclarationPage);
