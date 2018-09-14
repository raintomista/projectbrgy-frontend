import React from 'react';
import moment from 'moment';
import { UncontrolledCollapse } from 'reactstrap';
import './ResponseItem.less';

const ResponseItem = (props) => {
  const dateCreated = moment(props.dateCreated).format('MMM DD, YYYY hh:mm:ss A')
  return (
    <div className="response-item card">
      <div className="card-toggler" id={`toggler-${props.index}`}>
        <div className="author-info">
          <div className="sender">{props.sender}</div>
          <div className="receiver">to {props.receiver}</div>
        </div>
        <div className="extra-info">
          <div className="respond-date">{dateCreated}</div>
          <div className="badge badge-dark">#{props.index}</div>
        </div>
      </div>
      <UncontrolledCollapse toggler={`#toggler-${props.index}`}>
        <div className="expandable">
          <p className="message">
            {props.handleDisplayMessage(props.message)}
          </p>
          {props.attachments.length > 0 && (
            <div className="attachments">
              <label>{props.attachments.length} Attachments:</label>
              {props.attachments.map((attachment, index) => (
                <a href={attachment.link} target="_blank" className="attachment" key={index}>
                  yoyoyoyoy.png
                </a>
              ))}
            </div>
          )}
        </div>
      </UncontrolledCollapse >
    </div>
  );
}

export default ResponseItem;