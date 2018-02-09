const Site = () => ({
  name: 'One You 2',
  redirects: [],
  siteMenu: [
    {
      "type": "simple_menu_item",
      "value": {
        "link_text": "Free Health Check",
        "link_external": "",
        "link_page": 3
      },
      "id": "cc4b39a3-cffb-4a28-8bff-753a46bc496e"
    },
    {
      "type": "multi_menu_item",
      "value": {
        "label": "How to",
        "menu_items": [
          {
            "type": "simple_menu_item",
            "value": {
              "link_text": "Smoke Less",
              "link_external": "",
              "link_page": 3
            },
            "id": "19f605dd-30cf-4117-b188-dd8ffd5e4719"
          },
          {
            "type": "simple_menu_item",
            "value": {
              "link_text": "Move More",
              "link_external": "https://www.google.co.uk/",
              "link_page": null
            },
            "id": "2f70ee7a-76dc-451b-a27d-9ec6842c3094"
          }
        ]
      },
      "id": "154117ea-f0c8-4fa0-baf6-c51edfb44ebc"
    }
  ]
});

export default Site;
