import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Swipeable from 'react-swipeable';
import SiteNav from '../header-nav/SiteNav';
import Breadcrumb from './Breadcrumb';
import Text from '../Text';
import { Link } from 'react-router-dom';
import './page-header.css';

class PageHeader extends Component {
  constructor (props) {
    super(props);
    this.state = { navHeight: "0" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleResize = () => {
    this.setState({
      navHeight: this.divElement.clientHeight
    });
    document.querySelector('.page-wrapper').style.paddingTop = (this.divElement.clientHeight +'px');
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  setBurgerElem(elem) {
    this.burgerElem = elem;
  }

  swipedLeft(e, _absX) {
    PageHeader.toggleMenu(e);
  }

  render() {
    let { navItems, header, breadcrumbs } = this.props;
    let siteNav;

    if (navItems) {
      siteNav = <SiteNav navItems={navItems} />;
    }

    return (
      <div ref={(divElement) => this.divElement = divElement} className="container-fluid page-header">
        <div className= "container">
          <Breadcrumb breadcrumbs={breadcrumbs}/>
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
              className={'page-header__nav-container'}
              innerRef={(el) => this.swipeableElem = el}
              onSwipedLeft={this.swipedLeft}
            >
              {siteNav}
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
    event.preventDefault();
    box.classList.toggle('header-nav--open');
  }
}

PageHeader.defaultProps = {
  navItems: [],
  breadcrumbs: []
};

PageHeader.propTypes = {
  navItems: PropTypes.array,
  header: PropTypes.object.isRequired,
  breadcrumbs: PropTypes.array.isRequired
}

export default PageHeader;
