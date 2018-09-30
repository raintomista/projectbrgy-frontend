import React from 'react';

const Message = (props) => (
  <div className="message">
    <div className="author">
      <h6 className="author-name">Juan Dela Cruz</h6>
      <span className="timestamp">Fri</span>
    </div>
    <div className="recent-message">
      <span>Hello World</span>
    </div>
  </div>
);

export default Message;