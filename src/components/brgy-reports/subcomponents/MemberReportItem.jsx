import React from 'react';
import moment from 'moment';
import './MemberReportItem.less';

const MemberReportItem = (props) => {
  const dateCreated = moment(props.dateCreated).format('MMMM DD, YYYY hh:mm:ss A')
  return (
    <div className={`${props.status === 'unread' ? 'unread' : ''} ${props.status === 'responded' ? 'responded' : ''} member-report-item card`} onClick={props.handleClick}>
      <div className="card-body">
        <div className="card-title">
          {props.reportType} Report
        </div>
        <div className="details">
          {props.committeeType && (
            <span className="committee-type">{props.committeeType} &middot; </span>
          )}
          <span>by {props.author}</span>
          <span> &middot; {dateCreated}</span>
        </div>
        <p className="message">
          {props.message.length > 80 ?
            `${props.message.substring(0, 80)}...` :
            props.message
          }
        </p>
        <div className="status">
          <div className="indicator-group"><div className="indicator"></div> {props.status}</div>
        </div>
      </div>
    </div>
  );
}

export default MemberReportItem;