import React from 'react';
import moment from 'moment';

import './ReportItem.less';

const ReportItem = (props) => {
  const dateCreated = moment(props.dateCreated).format('MMMM DD, YYYY hh:mm:ss A')
  return (
    <div className="report-item card">
      <div className="card-body">
        <div className="card-title">
          {props.reportType} Report
      </div>
        <div className="details">
          {props.committeeType && (
            <span>{props.committeeType} &middot; </span>
          )}
          <span>{dateCreated}</span>
        </div>
        <p className="message">{props.message}</p>
      </div>
    </div>
  );
}

export default ReportItem;