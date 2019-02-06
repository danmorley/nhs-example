import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../base/Image';
import './cookie-banner.css';
import classNames from 'classnames';
import Cookies from 'universal-cookie';

import logo from '../../../assets/images/public-health-england-logo.png';

const cookies = new Cookies();

class CookieBanner extends Component {

  constructor (props) {
    super(props);
    this.state = {addClass: false};
    this.addClass = this.addClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deployCookie() {
    let d = new Date();
    d.setTime(d.getTime() + 364*24*60*60*1000);
    cookies.set('cookieBanner', 'true', { path: '/' , expires: d});
  }

  handleClick() {
    this.addClass();
    this.deployCookie();
  }

  addClass() {
    this.setState({
      close:true
    });

    let pageHeader = document.querySelector('.page-header');
    pageHeader.style.top = 0;
    document.querySelector('.page-wrapper').style.paddingTop = pageHeader.clientHeight + 'px';
  }

  render() {
    let tempImage = { link: logo, title: 'PHE logo' };

    return (
      <section className={classNames("cookie-banner", {"closed":this.state.close})}>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <Image image={tempImage} className="cookie-banner__phe-logo" />
            </div>
            <div className="col-lg-9">
              <p className="cookie-banner__body">
                We use cookies on our website for various purposes, which you can find out more about by reading our <Link to={global.rootUrl+'/privacy-policy'}>Privacy Policy</Link>. By continuing to use our website, you are consenting to our use of cookies. <Link to={global.rootUrl+'/privacy-policy'}>Learn More</Link>
              </p>
            </div>
            <div className="col-lg-1">
              <ul className="link-list link-list--centered">
                <li>
                  <button className="button-cta" onClick={this.handleClick}>
                    OK
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CookieBanner;
