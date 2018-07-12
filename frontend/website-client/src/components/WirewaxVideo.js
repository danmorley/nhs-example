import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASKET_KEY = 'basket';

class WirewaxVideo extends Component {


  constructor(props) {
    super(props);
    this.state = {
      basketCount: this.storageToJSON().length
    }
  }

  componentDidMount() {
    window.wirewax.addEventListener(window.wirewax.events.listeners.ADD_TO_CART, this.addToBasket.bind(this));

    window.wirewax.addEventListener(window.wirewax.events.listeners.PLAYER_READY, function(eventData) {
      console.log('Player ready');
    });
  }

  storageToJSON() {
    if (sessionStorage.getItem(BASKET_KEY) === '') {
      return []
    } else {
      return JSON.parse(sessionStorage.getItem(BASKET_KEY))
    }
  }

  addToBasket(eventData) {
    console.log('Adding to basket', eventData);
    let currentContents = this.storageToJSON();
    currentContents.push(eventData.data.product);
    sessionStorage.setItem(BASKET_KEY, JSON.stringify(currentContents));
    this.setState({basketCount: currentContents.length})
  }

  render() {
    let { video, ...rest } = this.props;
    if (!video) return null;
    let basketCount = this.state.basketCount;

    return (
      <div {...rest}>
        <iframe className='video-js' src={`//embed.wirewax.com/${video}?embedLoc=footlocker`} frameBorder="0" id="video"></iframe>
        <div className='basket'>
          { basketCount }
        </div>
      </div>
    );
  }
}

WirewaxVideo.propTypes = {
  video: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default WirewaxVideo;
