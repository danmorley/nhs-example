/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
export function notFoundPage() {
  return {
    title: 'Page Not Found',
    meta: {
      search_description: ''
    },
    body: [
      {
        type: 'notice_shelf',
        value: {
          header: 'Page not found',
          body: `<p>Back to the <a href='/oneyou'>home page</a></p>`,
          meta_variant: 'warning'
        }
      }
    ]
  };
}

export function serverErrorPage() {
  return {
    title: 'Something went wrong',
    meta: {
      search_description: ''
    },
    body: [
      {
        type: 'notice_shelf',
        value: {
          header: 'Something went wrong',
          body: `<p>Please refresh or try again later.</p>`,
          meta_variant: 'warning'
        }
      }
    ]
  };
}
