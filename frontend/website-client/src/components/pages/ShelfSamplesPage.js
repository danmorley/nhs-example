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
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>full_width</b>, variant <b>main-banner</b>'
      }
    },
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
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>cta_on_right</b>, variant <b>how-are-you</b>'
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
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>cta_on_right</b>, variant <b>how-are-you</b>'
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
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>not given</b>, variant <b>not given</b>'
      }
    },
    {
      id: 'abcd',
      type: 'promo_shelf',
      value: {
        heading: 'html::Active <span class="marker">10</span> App',
        body: 'Did you know that a brisk 10 minute walk counts as exercise?\nGet started with our free app',
        background_image: 'http://aaa.bbb.ccc/gb.png'
      }
    },
    {
      type: 'guidance_shelf',
      value: {
        heading: 'Promo Shelf',
        body: 'Layout <b>not given</b>, variant <b>blue_background</b>'
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
