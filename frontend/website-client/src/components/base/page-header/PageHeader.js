import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Swipeable from 'react-swipeable';
import SiteNav from '../header-nav/SiteNav';
import Breadcrumb from './Breadcrumb';
import Text from '../../base/Text';
import { Link } from 'react-router-dom';
import './page-header.css';

class PageHeader extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      navHeight: "0",
      navOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.swipedLeft = this.swipedLeft.bind(this);
  }

  handleResize = () => {
    this.setState({
      navHeight: this.divElement.clientHeight
    });
    document.querySelector('.page-wrapper').style.paddingTop = (this.divElement.clientHeight +'px');
  }

  handlePageChange() {
    this.closeMenu();
  }
  
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    global.rootElem.addEventListener('pageChanged', this.handlePageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    global.rootElem.removeEventListener('pageChanged', this.handlePageChange);
  }

  setBurgerElem(elem) {
    this.burgerElem = elem;
  }

  swipedLeft() {
    this.toggleMenu();
  }
  
  render() {
    let { navItems, header, breadcrumbs } = this.props;
    let siteNav;

    if (navItems) {
      siteNav = <SiteNav navItems={navItems} navCloseWasClicked={this.closeMenu} />;
    }

    return (
      <div ref={(divElement) => this.divElement = divElement} className="container-fluid page-header">
        <div className= "container">
          <Breadcrumb breadcrumbs={breadcrumbs}/>
          <div className="page-header__row">
            <div className="page-header__info">
              <button ref={(elem) => this.setBurgerElem(elem)} className="page-header__burger" onClick={this.toggleMenu}>
                <i className="font-icon"><span>{this.state.navOpen? 'close' : 'open'} navigation</span></i>
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

  closeMenu(){
    this.setState({ 
      navOpen: false 
    });
    document.querySelector('.page-wrapper').classList.remove('header-nav--open');
  }

  toggleMenu() {
    this.setState(prevState => ({navOpen: !prevState.navOpen}));
    document.querySelector('.page-wrapper').classList.toggle('header-nav--open');
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
