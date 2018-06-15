import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './breadcrumb.css';

class Breadcrumb extends Component {
  
  render() {
    let { breadcrumbs } = this.props;
    if (!breadcrumbs) return null;

    let links = breadcrumbs.map((item) => {
      return (
        <li key={item.id} className="breadcrumbs__item">
          <Link to={item.url} key={item.id} className="breadcrumbs__link">{item.name}</Link>
        </li> 
      );
    });

    return (
      <ul className="breadcrumbs">
        {links}
      </ul>
    );
  }
}

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.object.isRequired
}

export default Breadcrumb;