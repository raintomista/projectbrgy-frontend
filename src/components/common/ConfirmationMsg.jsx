import React from 'react';


const ConfirmationMsg = (props) => (
    <div className="confirmation-msg card">
    <div className="card-body">
      <h3>{props.title}</h3>
      <p>{props.message}</p>
    </div>
  </div>
);

export default ConfirmationMsg;