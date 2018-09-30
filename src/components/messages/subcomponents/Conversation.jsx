import React, { Component } from 'react';
import './Conversation.less';

export default class Conversation extends Component {
  render() {
    return (
      <div className="messaging-conversation">
        <div className="header">
          <h5>Juan Dela Cruz</h5>
        </div>
        <div className="messages">
          <div className="message">Hahaha</div>
          <div className="message">Hahaha</div>
        </div>
        <div className="message-box">
          <input type="text"/>
        </div>
      </div>
    );
  }
}