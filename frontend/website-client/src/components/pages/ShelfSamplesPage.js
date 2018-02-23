import React, { Component } from 'react';
import Page from '../Page';
import withOwnContent from './withOwnContent';

/**
 *  Shelf Sample Page uses the withOwnContent higher order component to return a page
 *  but using local static content.
 */
const sampleShelves = {
  title: 'Shelf Samples',
  body: [
    {
      id: 'xyz',
      type: 'page_heading',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        cta_button_label: 'Download',
        cta_button_link: 'http://www.somewebsite.co.uk',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'main-banner'
      }
    },
    {
      id: 'xyz',
      type: 'sub_page_heading',
      value: {
        heading: 'BE KIND MIND',
        body: 'Mental health affects us all at some time in our lives. Get practical advice and support now',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_layout: 'full_width',
        meta_variant: 'main-banner'
      }
    },
    {
      id: 'abc',
      type: 'promo_shelf',
      value: {
        heading: 'html::How are <span class="marker">you</span>? Quiz',
        cta_button_label: 'Have a go',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
      }
    },
    {
      id: 'abc',
      type: 'promo_shelf',
      value: {
        heading: 'html::Tell us what <span class="marker">you</span> Think',
        cta_button_label: 'Send a message',
        cta_button_link: 'http://www.somewebsite.co.uk',
        meta_layout: 'cta_on_right',
        meta_variant: 'how-are-you'
      }
    },
    {
      id: 'abcde',
      type: 'promo_shelf',
      value: {
        heading: 'html::<span class="text-light">Over 40?</span><br />Check Your Health',
        background_image: 'http://aaa.bbb.ccc/gb.png',
        meta_variant: 'extra-height'
      }
    }
  ]
};

export default withOwnContent(Page, sampleShelves);
