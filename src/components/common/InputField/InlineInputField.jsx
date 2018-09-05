import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import './InlineInputField.less';

const InlineInputField = observer((props) => (
  <React.Fragment>
    <div className="inline form-group">
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        { props.required && <span className="required"> * </span> }
      </label>
      <input type="text" className={`${props.field.error ? 'invalid' : ''} form-control`} id={props.id} {...props.field.bind()} maxLength={props.maxLength} />
    </div>

  </React.Fragment>
));

InlineInputField.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,  
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,  
}

export default InlineInputField;

