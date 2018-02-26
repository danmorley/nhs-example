const Page = () => ({
    "id": 4,
    "meta": {
        "type": "schoolzone.SzHomePage",
        "detail_url": "http://schools.phe.gov.uk:8000/api/v2/pages/4/",
        "html_url": "http://schools.phe.gov.uk:8000/",
        "slug": "welcome-phe-school-zone",
        "show_in_menus": false,
        "seo_title": "",
        "search_description": "",
        "first_published_at": "2017-02-06T10:17:42.457653Z",
        "parent": null
    },
    "title": "No such page",
    "body": [
        {
            "type": "general_text_shelf",
            "value": {
                "text": `<h2>Page not found</h2><p>The page ${window.location.pathname} cannot be found.</p>`
            }
        }
    ]
});

export default Page;
