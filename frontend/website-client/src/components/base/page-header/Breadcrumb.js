import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './breadcrumb.css';

class Breadcrumb extends Component {

  render() {
    let links = [];
    let { breadcrumbs } = this.props;

    if (!breadcrumbs) {
      // do nothing;
    }
    else {
      links = breadcrumbs.filter(function (item) {
        return item.visible;
      }).map((item) => {
        return (
          <li key={item.url} className="breadcrumbs__item">
            <Link to={item.url} key={item.id} className="breadcrumbs__link">{item.name}</Link>
          </li>
        );
      });
    }

    return (
      <ul className="breadcrumbs">
        {links}
      </ul>
    );
  }
}

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
}

export default Breadcrumb;
