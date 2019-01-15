import React, { Component } from 'react';
import './buttons.css';
import PropTypes from 'prop-types';
import CtaLinks from './CtaLinks';

/**
 * Implemenation of a simple Buttons component.
 * 
 * Layouts:
 * 
 * Vertical, Left - Buttons are left aligned (vertical_left)
 * Vertical, Center - Buttons are aligned centrally (vertical_center)
 * Vertical, Right - Buttons are right aligned (vertical_right)
 *  
 * Horizontal, Left - Buttons are aligned horizontally from the left (horizontal_left)
 * Horizontal, Center - Buttons are centered horizontally (horizontal_center)
 * Horizontal, Right - Buttons are aligned horizontally to the right (horizontal_right)
 * 
 */
class Buttons extends Component {
  render() {
    const { ctas, layout, variant,  className } = this.props;

    // Direction: vertical, horizontal
    // Alignment: left, center, right
    const [ direction, alignment ] = layout.split('_');
    const buttonsClass = `buttons row no-gutters buttons-direction-${direction} buttons-align-${alignment} ${className}`;

    return (
      <div className={buttonsClass}>
        <div className="buttons-ctas">
          {<CtaLinks ctas={ctas} variant="button" />}
        </div>
      </div>
    );
  }
}

Buttons.defaultProps = {
  className: '',
  layout: 'horizontal_left',
  variant: 'none'
}

Buttons.propTypes = {
  ctas: PropTypes.string,
  layout: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string.isRequired,
  id: PropTypes.string
};

export default Buttons;
