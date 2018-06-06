import React from 'react';

const LoginInputField = (props) => (
  <div className="form-group row">
    <label for={props.name} class="col-12 offset-sm-1 col-sm-2 offset-md-2 col-md-2">{props.label}</label>
    <div className="col-12 col-sm-8 col-md-6">
      <input type={props.type} class="form-control" id={props.name} />
    </div>
  </div>
);

export default LoginInputField;


