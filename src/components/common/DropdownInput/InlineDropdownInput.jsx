import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList'

import 'react-widgets/lib/less/react-widgets.less';

import './InlineDropdownInput.less';

const InlineDropdownInput = observer((props) => (
  <React.Fragment>
    <div className="inline dropdown-input form-group">
      <label htmlFor={props.id}>
        <span>{props.label}</span>
      </label>
      <DropdownList
        id={props.id}
        data={props.field.options}
        defaultValue={props.field.value}
        onChange={props.field.onChange}
        disabled={props.disabled}
      />
    </div>

  </React.Fragment>
));

InlineDropdownInput.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default InlineDropdownInput;

