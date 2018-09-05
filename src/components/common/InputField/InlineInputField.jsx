import React from 'react';
import PropTypes from 'prop-types';

import './InlineInputField.less';

const InlineInputField = (props) => (
  <div className="inline form-group">
    <label htmlFor={props.id}>{props.label}</label>
    <input type="text" className="form-control" id={props.id} />
  </div>
)

InlineInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default InlineInputField;

