import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList'

import 'react-widgets/lib/less/react-widgets.less';

import './InlineInputFieldWithDropdown.less';

const InlineInputFieldWithDropdown = observer((props) => (
  <React.Fragment>
    <div className="inline field-dropdown form-group">
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        <span className="required"> * </span>
      </label>
      <input
        type={props.type}
        className={`${props.residencyField.error ? 'invalid' : ''} form-control`}
        id={props.id} {...props.residencyField.bind()}
        maxLength={props.maxLength}
      />
      <DropdownList
        id={props.id}
        data={props.residencyDropdown.options}
        defaultValue={props.residencyDropdown.value}
        onChange={props.residencyDropdown.sync}
      />
    </div>

  </React.Fragment>
));

InlineInputFieldWithDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  residencyDropdown: PropTypes.object.isRequired,
  residencyField: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

export default InlineInputFieldWithDropdown;

