import React from 'react';
import moment from 'moment';

const ReportItem = (props) => {
  const dateCreated = moment(props.dateCreated).format('MMMM DD, YYYY hh:mm:ss A')
  return (
    <div className="report-overview card">
      <div className="card-body">
        <div className="card-title">
          {props.reportType} Report
        </div>
        <div className="details">
          {props.committeeType && (
            <span className="committee-type">{props.committeeType} &middot; </span>
          )}
          <span>{dateCreated}</span>
        </div>
        <p className="message">
          {props.handleDisplayMessage(props.message)}
        </p>
      </div>
    </div>
  );
}

export default ReportItem;