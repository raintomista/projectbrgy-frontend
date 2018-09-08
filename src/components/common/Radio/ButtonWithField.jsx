import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './ButtonWithField.less';

const RadioButtonWithField = observer((props) => (
  <div className="radio-with-field">
    <label className="radio-button">
      <span className="label">
        {props.label}; please specify
        {props.field.error && <span className="required"> *</span>}
      </span>
      <input
        type="radio"
        value={props.label}
        name={props.name}
        defaultChecked={props.defaultChecked}
        onChange={props.handleChange}
      />
      <span className="checkmark"></span>
    </label>
    <input type="text" className={`${props.field.error ? 'invalid' : ''} form-control`} {...props.field.bind()} />
  </div>
));

RadioButtonWithField.propTypes = {
  defaultChecked: PropTypes.bool,
  field: PropTypes.object,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default RadioButtonWithField;
