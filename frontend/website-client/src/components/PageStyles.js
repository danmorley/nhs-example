import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageStyles extends Component {
  render() {
    let { content } = this.props;
    if (!content) return null;

    return (
      <style type="text/css" scoped dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

PageStyles.propTypes = {
  content: PropTypes.string
};

export default PageStyles;
