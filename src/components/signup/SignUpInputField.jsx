import React from 'react';

const SignupInputField = (props) => {
  const { required, touched, errors } = props;

  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type={props.type}
          className="form-control"
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </div>
      { required ? touched && errors && <div>{errors}</div> : errors && <div>{errors}</div> }
    </div>
  );
}

export default SignupInputField;