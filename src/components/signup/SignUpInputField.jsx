import React from 'react';

const SignupInputField = (props) => (
    <div className="inline-fluid form-group">
        <label for={props.name}>{props.label}</label>
        <input type={props.type} className="form-control" name={props.name} />
    </div>
);

export default SignupInputField;