import React from 'react';
import PropTypes from 'prop-types';

import './Button.less';

const LightRoundedButton = (props) => (
  <button
    className="btn rounded-light"
    disabled={props.disabled}
    type={props.type}
  >
    {props.value}
  </button>
);

LightRoundedButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,  
}

export default LightRoundedButton;