import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import SiteNav from '../header-nav/SiteNav';
import Text from '../Text';
import { Link } from 'react-router-dom';
import styles from './page-header.css';

class PageHeader extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  setBurgerElem(elem) {
    this.burgerElem = elem;
  }

  swipedLeft(e, absX) {
    PageHeader.toggleMenu(e);
  }

  render() {
    let { navItems, header } = this.props;

    return (
      <div className="container-fluid page-header">
        <div className="container">
          <div className="page-header__row">
            <div className="page-header__info">
              <button ref={(elem) => this.setBurgerElem(elem)} className="page-header__burger" onClick={this.handleClick}>
                  <i className="font-icon"></i>
              </button>
              <Link to={global.rootUrl} className="page-header__logo">
                <Text content={header.title || 'html::One <span>You</span>'} tagName={"div"} />
              </Link>
            </div>
            <Swipeable
               innerRef={(el) => this.swipeableElem = el}
               onSwipedLeft={this.swipedLeft}
             >
             <SiteNav navItems={navItems} />
           </Swipeable>
          </div>
        </div>
      </div>
    );
  }

  handleClick(event) {
    PageHeader.toggleMenu(event);
  }

  static toggleMenu(event) {
    const box = document.querySelector('.page-wrapper');
    event.preventDefault()
    box.classList.toggle('header-nav--open');
  }
}

export default PageHeader;
