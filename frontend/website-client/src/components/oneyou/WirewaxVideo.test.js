import React from 'react';
import ReactDOM from 'react-dom';
import WirewaxVideo from './WirewaxVideo.js';

const BASKET_KEY = 'basket';

const eventData = {
                    data: {
                      product: {
                        imageurl: "https://wirewax.s3.amazonaws.com/creativeData/demos/addtocarttest/shoes.jpg",
                        name: "Asics Gel-Lyte iii Trainer",
                        quantity: 1,
                        size: "6",
                        variantId: "42592100"
                      }
                    },
                    name: "addToCart",
                    uniqueViewId: "05a371dd-9480-4e43-bc0e-c28082dd6223",
                    vidId: 8012777
                  }

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WirewaxVideo />, div);
});

it('renders without crashing with content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WirewaxVideo video={"video_source"} />, div);
});

it('returns an empty array from storageToJson when there is an empty basket', () => {
  const div = document.createElement('div');
  let component = ReactDOM.render(<WirewaxVideo video={"video_source"} />, div);
  expect(sessionStorage.getItem(BASKET_KEY)).toEqual('[]');
  expect(component.storageToJSON().length).toEqual(0);
});

it('returns an array containing the stored data from storageToJson when there is something in basket', () => {
  expect(sessionStorage.getItem(BASKET_KEY)).toEqual('[]');
  const div = document.createElement('div');
  let component = ReactDOM.render(<WirewaxVideo video={"video_source"} />, div);
  sessionStorage.setItem(BASKET_KEY, JSON.stringify([eventData]));
  expect(sessionStorage.getItem(BASKET_KEY)).not.toEqual('');
  expect(component.storageToJSON().length).toEqual(1);
  expect(component.storageToJSON()[0]).toEqual(eventData);
  sessionStorage.setItem(BASKET_KEY, '[]');
});

it('adds an item to the sessionStorage basket correctly in addToBasket', () => {
  expect(sessionStorage.getItem(BASKET_KEY)).toEqual('[]');
  const div = document.createElement('div');
  let component = ReactDOM.render(<WirewaxVideo video={"video_source"} />, div);
  component.addToBasket(eventData);
  expect(sessionStorage.getItem(BASKET_KEY)).not.toEqual('');
  expect(component.storageToJSON().length).toEqual(1);
  expect(component.storageToJSON()[0]).toEqual(eventData.data.product.variantId);
  sessionStorage.setItem(BASKET_KEY, '[]');
});
