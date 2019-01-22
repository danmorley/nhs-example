import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../../base/Text';
import SimpleMenuItem from './SimpleMenuItem';

class MultiMenuItem extends Component {  
  
  constructor (props) {
    super(props);    
    this.state = {
      menuOpen: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
  }
  
  render() {
    let {item, classNamePrefix} = this.props;
    let children = item.value.menu_items.map((item) => {
      if (item.type === 'simple_menu_item'){
        return (
          <SimpleMenuItem item={item} key={item.id} classNamePrefix={classNamePrefix} subNavClicked={this.hideSubMenu} />
        );
      } else {
        return null;
      }
    });

    return (
      <li className={`${classNamePrefix}-nav__item ${classNamePrefix}-nav-multi__item sub-nav-${this.state.menuOpen ? 'show' : 'hide' }`}
        onMouseEnter={this.showSubMenu}
        onMouseLeave={this.hideSubMenu}
      >
        <div className= {this.props.classNamePrefix+"-nav__separator"}>
          <span className={classNamePrefix+"-nav__secondary-title"}
            onClick={this.handleClick}>
            <Text tagName="span" content={item.value.label} />
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
  
  hideSubMenu() {
    this.setState({
      menuOpen: false
    });
  }
  
  showSubMenu() {
    this.setState({
      menuOpen: true
    });
  }
  
  handleClick(e) {
    e.target.classList.toggle(`${this.props.classNamePrefix}-nav__secondary-title--open`);
  }
}

MultiMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  classNamePrefix: PropTypes.string.isRequired
}

export default MultiMenuItem;
