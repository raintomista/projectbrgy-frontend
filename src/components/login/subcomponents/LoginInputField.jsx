import React from 'react';
import { observer } from 'mobx-react';

const LoginInputField = observer((props) => (
  <div className="form-group row">
    <label htmlFor={props.name} className="col-12 offset-sm-1 col-sm-2 offset-md-2 col-md-2">
      {props.label}
    </label>
    <div className="col-12 col-sm-8 col-md-6">
      <input
        type={props.type}
        className="form-control"
        id={props.name}
        name={props.name}
        {...props.field.bind({ type: props.type })}
      />
    </div>
  </div>
));

export default LoginInputField;


