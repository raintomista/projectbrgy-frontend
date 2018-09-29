import React from 'react';
import { observer } from 'mobx-react';

export const SignUpInputField = observer((props) => {
  const disabled = props.field.value.length === 0;
  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>
          {props.label}
          {props.required && <span className="required"> * </span>}
        </label>
        <input
          className={`form-control ${props.field.error ? 'invalid' : ''} ${props.disabled && disabled ? 'disabled' : ''}`}
          name={props.name}
          {...props.field.bind({ type: props.type })}
        />
      </div>
    </div>
  );
});

export const UncontrolledSignUpInputField = (props) => {
  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type={props.type}
          className="form-control"
          name={props.name}
          value={props.value}
        />
      </div>
    </div>
  );
}

