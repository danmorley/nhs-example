import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class BackToTopButton extends Component {
  constructor(props){
    super(props);
    this.scrollToTop=this.scrollToTop.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = ({
      windowHeight : window.screen.height
    });
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  setBackToTopButton(elem) {
    this.backToTopButton = elem;
  }
  
  scrollToTop() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
      window.scrollBy(0, -50);
      requestAnimationFrame(this.scrollToTop);
    }
  }
  
  handleClick(e) {
    this.scrollToTop();
  }
   
  handleScroll(event) {
    if (window.scrollY > (this.state.windowHeight + 10)) {
      this.backToTopButton.classList.add('back-to-top--show');
    }
    else {
      this.backToTopButton.classList.remove('back-to-top--show');
    }
  }
  
  render() {
    return (
      <button className="back-to-top" aria-label="back to top of page" ref={(elem) => this.setBackToTopButton(elem)} onClick={this.handleClick.bind(this)}></button>  
    )
  }
}

export default BackToTopButton;