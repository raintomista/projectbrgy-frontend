import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationMessage = (props) => (
  <div className="confirmation-msg">
    {_renderMsg(props.type, props.fee, props.pickup)}
  </div>
);


function _renderMsg(type, fee, pickup) {
  switch (type) {
    case 'barangay-clearance':
      return (
        <React.Fragment>
          <h3>Barangay Clearance Form Sent!</h3>
          <p>
            Please bring the required documents along with the permit fee of {fee}.
            <br />
            Your photo and thumbprint will be processed upon pickup of your Barangay Clearance on {pickup}.
            <br />
            Thank you!
          </p>
        </React.Fragment>
      );
    case 'business-permit':
      return (
        <React.Fragment>
          <h3>Barangay Business Permit Form Sent!</h3>
          <p>
            Please bring the required documents along with the permit fee of {fee} to pickup your Barangay Business Permit on {pickup}.
            <br />
            Thank you!
          </p>
        </React.Fragment>
      );
    case 'katarungang-pambarangay':
      return (
        <React.Fragment>
          <h3>Complaint Sent!</h3>
          <p>
            You will receive the confirmation of Certification to File Action from the Lupon Tagapamayapa/Pangkat Secretary in 3 days, including the available date of hearing.
            <br />
            Thank you!
          </p>
        </React.Fragment>
      );
    default:
      break;
  }
}


ConfirmationMessage.propTypes = {
  type: PropTypes.string.isRequired,
  fee: PropTypes.string,
  pickup: PropTypes.string,
}

export default ConfirmationMessage;