import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import Message from './Message';
import './Inbox.less';

@observer
export default class Inbox extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.handleListen((message) => this.handleListen(message));
    }, 1000);
  }

  render() {
    const { inbox } = this.props.MessagingStore;
    const items = inbox.map((message, index) => (
      <Message
        authorId={message.message_sender_id}
        user_first_name={message.sender_first_name}
        user_last_name={message.sender_last_name}
        dateCreated={this.formatDate(message.message_date_created)}
        message={message.message_message}
        status={message.message_status}
        key={message.message_id}
      />
    ))

    return (
      <div className="messaging-inbox">
        <div className="header">
          <h5>Messages</h5>
        </div>
        <div className="messages">
          {items}
        </div>
      </div>
    );
  }

  formatDate(date) {
    return moment(date).fromNow();
  }

  handleListen(message) {
    this.props.MessagingStore.receiveInboxMsg(message);
  }
}