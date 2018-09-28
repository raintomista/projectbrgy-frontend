import React from 'react';
import { DropdownList } from 'react-widgets'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';

const SignUpDropdownField = (props) => {

  return (
    <div>
      <div className="inline-fluid form-group">
        <label htmlFor={props.name}>
          {props.label}
          {props.required && <span className="required"> * </span>}
        </label>
        <DropdownList
          data={props.data}
          value={props.value}
          onChange={props.handleChange}
          disabled={props.disabled}
          selectIcon={<FontAwesomeIcon icon={faChevronDown} />}
        />
      </div>
    </div>
  );
}

export default SignUpDropdownField;