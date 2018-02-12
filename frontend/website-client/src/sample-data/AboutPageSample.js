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
    "title": "One You About Page",
    "page_content": [
        {
            "type": "general_text_shelf",
            "value": {
                "text": "<h2>About One You 2</h2><p>This is some text on the general text shelf</p><ul><li>And a bullet point</li><li>and another bullet point</li><li>and yet another bullet point</li></ul><p>This sentence contains a link to the <a id=\"3\" linktype=\"page\">home page</a>.</p><p>And this sentence contains a link to the BBC news site <a href=\"http://bbc.co.uk/news\">here</a>.<br/></p>"
            }
        },
        {
            "type": "banner_shelf",
            "value": {
                "caption": "<p>Caption for Rise Above ...<br/></p>",
                "image": 4,
                "cta": {
                    "link_external": "",
                    "link_text": "View more",
                    "link_page": 3
                },
                "heading": "Rise Above",
                "background_image": 2
            }
        },
        {
            "type": "carousel_shelf",
            "value": {
                "caption": "",
                "heading": "",
                "carousel_items": [
                    {
                        "type": "simple_carousel_item",
                        "value": {
                            "background_image": null,
                            "meta_layout": "image_on_left",
                            "image": 3,
                            "caption": "<p>Caption for teacher support carousel item ...<br/></p>",
                            "meta_variant": "primary",
                            "heading": "Teacher support"
                        }
                    },
                    {
                        "type": "cta_carousel_item",
                        "value": {
                            "background_image": null,
                            "meta_layout": "image_on_left",
                            "image": 1,
                            "caption": "<p>This is the caption of a CTA carousel item ...<br/></p>",
                            "cta": {
                                "link_external": "",
                                "link_text": "View more",
                                "link_page": 3
                            },
                            "meta_variant": "primary",
                            "heading": ""
                        }
                    },
                    {
                        "type": "simple_carousel_item",
                        "value": {
                            "background_image": null,
                            "meta_layout": "image_on_right",
                            "image": 4,
                            "caption": "<p>This is the caption for the Rise Above carousel item ...<br/></p>",
                            "meta_variant": "primary",
                            "heading": ""
                        }
                    }
                ]
            }
        },
        {
            "type": "general_text_shelf",
            "value": {
                "text": "<h2>This is a heading 2</h2><p>This is some text on the general text shelf</p><ul><li>And a bullet point</li><li>and another bullet point</li><li>and yet another bullet point</li></ul><p>This sentence contains a link to the <a id=\"3\" linktype=\"page\">home page</a>.</p><p>And this sentence contains a link to the BBC news site <a href=\"http://bbc.co.uk/news\">here</a>.<br/></p>"
            }
        }
    ]
});

export default Page;
