import React, { Component } from 'react';
import SimpleMenuItem from './SimpleMenuItem';

class MultiMenuItem extends Component {

  render() {
    let {item, classNamePrefix} = this.props;
    let children = item.value.menu_items.map((item) => {
      if (item.type === 'simple_menu_item'){
        return (
          <SimpleMenuItem item={item} key={item.id} classNamePrefix={classNamePrefix} />
        );
      } else {
        return null;
      }
    });

    return ( 
      <li className={classNamePrefix+"-nav__item "+classNamePrefix+"-nav-multi__item"}>
        <div className= {this.props.classNamePrefix+"-nav__separator"}>
          <span className={classNamePrefix+"-nav__secondary-title"}
            onClick={this.handleClick.bind(this)}>
            {item.value.label}
          </span>
          
          <div className={classNamePrefix+"-nav__secondary-nav"}>
            <ul className={"container "+classNamePrefix+"-nav__secondary-nav-inner"}>
              {children}
            </ul>
          </div>
        </div>
      </li>
    );
  }
  
  handleClick(e) {
    console.log(`'${this.props.classNamePrefix}-nav__secondary-title--open'`);
    e.target.classList.toggle(`${this.props.classNamePrefix}-nav__secondary-title--open`);
  }
}

export default MultiMenuItem;
