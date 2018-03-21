/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
function notFoundPage() {
  return {
    title: 'Page Not Found',
    page_styles: '#panel-video-teaser-4 h3 { color: orange; }',
    meta: {
      search_description: ''
    },
    body: [
      {
        type: 'notice_shelf',
        value: {
          heading: 'Page cannot be found',
          body: `<p>The page ${window.location.pathname} cannot be found.</p>`,
          meta_variant: 'warning'
        }
      }
    ]
  };
}

export default notFoundPage;
