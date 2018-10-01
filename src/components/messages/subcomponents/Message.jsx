import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faShare from '@fortawesome/fontawesome-free-solid/faShare'

const Message = (props) => (
  <Link
    to={{
      pathname: `/messages/${props.authorId}`,
      state: {
        user_first_name: props.user_first_name,
        user_last_name: props.user_last_name,
      }
    }}
    className={`${props.status === 'unread' ? 'unread' : ''} message`}
  >
    <div className="author">
      <h6 className="author-name">{props.user_first_name} {props.user_last_name}</h6>
      <span className="timestamp">{props.dateCreated}</span>
    </div>
    <div className="recent-message">
      <span>
        {props.status === 'replied' && <FontAwesomeIcon icon={faShare} className="replied-icon"/>}
        {props.message}
      </span>
    </div>
  </Link>
);

export default Message;