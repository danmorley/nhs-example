function siteMapPage(site) {
  return {
    title: 'Site Map',
    meta: {
      search_description: ''
    },
    body: [
      {
        id: 'site-map-shelf',
        type: 'page_heading_shelf',
        value: {
          heading: 'Sitemap',
          meta_layout: 'page_header'
        }
      },
      {
        type: 'sitemap_shelf',
        value: site
      }
    ]
  };
}

export default siteMapPage;
