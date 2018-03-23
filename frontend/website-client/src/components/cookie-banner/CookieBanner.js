import React, { Component } from 'react';
import CtaUtils from '../shared/CtaUtils';
import CtaLink from '../shared/CtaLink';
import Text from '../Text';
import Image from '../Image.js';
import styles from './cookie-banner.css';
import classNames from 'classnames';
import Cookies from 'universal-cookie';

import logo from '../../assets/images/public-health-england-logo.png';

const content = {
  "body" : '<p>We use cookies on our website for various purposes, which you can find out more about by reading our <a href="#">Privacy Policy</a>. By continuing to use our website, you are consenting to our use of cookies.</p>',
  "link" : ''  ,
  "close_button": 'OK', 
  cta_link: {
    link_text: 'Learn more',
    link: 'privacy-policy'
  }
}

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
  }
  
  render() {
    let tempImage = { link: logo, title: 'PHE logo' };  
    
    return (    
      <section className={classNames("cookie-banner", {"closed":this.state.close})}>
        <div className="container">
          <div className="row">
            <div className="col">  
              <Image image={tempImage} className="cookie-banner__phe-logo" />
              <Text content={content.body} className={"cookie-banner__body"} format="richtext" tagName="div" />
              <ul className="link-list link-list--centered">
                <li>
                  <button className="button-cta" onClick={this.handleClick}>
                    {content.close_button}
                  </button>  
                </li>
                <li>
                  <CtaLink cta={content.cta_link}/>
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