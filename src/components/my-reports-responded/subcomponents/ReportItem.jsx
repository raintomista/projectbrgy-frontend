import React from 'react';
import moment from 'moment';

import './ReportItem.less';

const ReportItem = (props) => {
  const dateUpdated = moment(props.dateUpdated).format('MMMM DD, YYYY hh:mm:ss A')
  return (
    <div className="responded-my-report-item card" onClick={props.handleViewItem}>
      <div className="card-body">
        <div className="card-title">
          {props.reportType} Report
      </div>
        <div className="details">
          {props.committeeType && (
            <span className="committee-type">{props.committeeType} &middot; </span>
          )}
          <span>Responded at {dateUpdated}</span>
        </div>
        <p className="message">
          {props.message.length > 80
            ? `${props.message.substring(0, 80).trim()}...`
            : props.message
          }
        </p>
      </div>
    </div>
  );
}

export default ReportItem;