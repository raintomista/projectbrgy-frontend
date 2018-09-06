import React from 'react';
import PropTypes from 'prop-types';

import './Button.less';

const RadioButton = (props) => (
  <label className="radio-button">
    <span className="label">{props.label}</span>
    <input
      type="radio"
      value={props.label}
      name={props.name}
      defaultChecked={props.defaultChecked}
      onChange={props.handleChange}
    />
    <span className="checkmark"></span>
  </label>
)

RadioButton.propTypes = {
  defaultChecked: PropTypes.bool,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default RadioButton;
