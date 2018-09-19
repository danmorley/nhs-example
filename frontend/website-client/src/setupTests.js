import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

const localStorageMock = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()

global.localStorage = localStorageMock

const sessionStorageMock = (() => {
  let store = {basket: '[]'}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {}
    }
  };
})()

global.sessionStorage = sessionStorageMock

global.rootUrl = 'oneyou.co.uk';

window.wirewax = {
  addEventListener: function(key, callback) {
    console.log('adding listener for ' + key);
  },

  events: {
    listeners: {
      ADD_TO_CART: 'addToCart',
      PLAYER_READY: 'playerReady'
    }
  }
}
