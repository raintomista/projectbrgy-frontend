import React from 'react';

const SignUpDropdownField = (props) => {

  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <select
          className="form-control"
          name={props.name}
          onBlur={props.handleBlur}
          onChange={(e) => props.handleChange(e.target.value)}
        >
          <option value="">Select {props.label}</option>
          {props.data.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </div>
    </div>
  );
}

export default SignUpDropdownField;