import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationMessage = (props) => (
  <div className="confirmation-msg">
    {_renderMsg(props.type, props.fee, props.datetime)}
  </div>
);


function _renderMsg(type, fee, datetime) {
  switch (type) {
    case 'barangay-clearance':
      return (
        <React.Fragment>
          <h3>Barangay Clearance Form Sent!</h3>
          <p>
            Please bring the required documents along with the permit fee of {fee}. 
            <br />
            Your photo and thumbprint will be processed upon pickup of your Barangay Clearance on {datetime}. 
            <br/>
            Thank you!
          </p>
        </React.Fragment>
      );
      break;
  }
}


ConfirmationMessage.propTypes = {
  type: PropTypes.string.isRequired,
  fee: PropTypes.string,
  datetime: PropTypes.string,
}

export default ConfirmationMessage;