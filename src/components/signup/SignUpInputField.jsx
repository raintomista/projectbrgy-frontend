import React from 'react';

export const SignUpInputField = (props) => {
  const { required, touched, errors } = props;

  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type={props.type}
          className="form-control"
          name={props.name}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
      { required ? touched && errors && <div>{errors}</div> : errors && <div>{errors}</div> }
    </div>
  );
}

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

