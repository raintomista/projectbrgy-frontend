import React from 'react';
import { Link } from 'react-router-dom';

const Message = (props) => (
  <Link to={`/messages/${props.authorId}`} className={`${props.status === 'unread' ? 'unread' : ''} message`}>
    <div className="author">
      <h6 className="author-name">{props.authorName}</h6>
      <span className="timestamp">{props.dateCreated}</span>
    </div>
    <div className="recent-message">
      <span>{props.message}</span>
    </div>
  </Link>
);

export default Message;