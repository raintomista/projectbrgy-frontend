import React from 'react';
import { observer } from 'mobx-react';

const ForgotInputField = observer((props) => (
  <div className="form-group forgot">
    <label htmlFor={props.name}>
      {props.label}
    </label>
    <div>
      <input
        type={props.type}
        className={`form-control ${props.field.error ? 'invalid' : ''}`}
        id={props.name}
        name={props.name}
        {...props.field.bind({ type: props.type })}
      />
    </div>
  </div>
));

export default ForgotInputField;


