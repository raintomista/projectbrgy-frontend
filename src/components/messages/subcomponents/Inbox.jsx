import React, { Component } from 'react';
import Message from './Message';
import './Inbox.less';

export default class Inbox extends Component {
  render() {
    return (
      <div className="messaging-inbox">
        <div className="header">
          <h5>Messages</h5>
        </div>
        <div className="messages">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>
    );
  }
}