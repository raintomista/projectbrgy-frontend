import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

const FieldBox = observer((props) => (
  <div className="comment-box">
    <input
      type="text"
      className="form-control"
      onKeyPress={props.handleEnter}
      {...props.field.bind()}
    />
  </div>
))

FieldBox.propTypes = {
  field: PropTypes.object.isRequired,
  handleEnter: PropTypes.func.isRequired
}

export default FieldBox;









