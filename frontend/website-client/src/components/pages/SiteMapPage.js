import Page from '../Page';
import withOwnContent from './withOwnContent';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
const siteMapPage = {
  title: 'Site Map',
  meta: {
    search_description: ''
  },
  body: [
    {
      type: 'sitemap_shelf',
      value: {
        heading: 'Sitemap'
      }
    }
  ]
};

export default withOwnContent(Page, siteMapPage);
