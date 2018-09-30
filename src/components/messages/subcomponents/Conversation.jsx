import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Form from './Form';


import './Conversation.less';

@observer
export default class Conversation extends Component {
  constructor(props) {
    super(props);
    this.form = new Form();
    this.form.$('receiver_id').set('value', props.receiverId);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.handleListen((message) => {
        if (message.sender_id === this.props.receiverId) {
          this.addMessage(message)
        }
      });
    }, 1000);
  }

  render() {
    const { MessagingStore } = this.props;
    const messages = MessagingStore.messages.map((message, index) => {
      return (
        <div className={`message-container ${message.sender_id === this.props.receiverId ? 'received' : ''}`}>
          <div className="message" key={index}>
            {message.message}
          </div>
        </div>
      );

    });
    return (
      <div className="messaging-conversation">
        <div className="header">
          <h5>Juan Dela Cruz</h5>
        </div>
        <div className="messages">
          {messages}
        </div>
        <div className="message-box">
          <input type="text"
            onKeyPress={(e) => this.handleEnter(e)}
            {...this.form.$('message').bind()}
          />
        </div>
      </div>
    );
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.form.handleSubmit(e, this.props.handleSendMessage);
    }
  }

  addMessage(message) {
    this.props.MessagingStore.receiveMessage(message);
  }
}