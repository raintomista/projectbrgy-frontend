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
    const { loggedUser } = this.props.AppData;
    const { inbox } = this.props.MessagingStore;

    const items = inbox.map((message, index) => {
      let chatmate_id, status;

      if (loggedUser.user_role === 'barangay_member') {
        chatmate_id = loggedUser.user_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.user_id === message.sender_id ? message.sender_status : message.receiver_status;
      } else if (loggedUser.user_role === 'barangay_page_admin') {
        chatmate_id = loggedUser.barangay_page_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.barangay_page_id === message.sender_id ? message.sender_status : message.receiver_status;
      }
      const active = this.props.receiverId === chatmate_id ? true : false;

      return (
        <Message
          authorId={chatmate_id}
          user_first_name={message.sender_first_name}
          user_last_name={message.sender_last_name}
          dateCreated={this.formatDate(message.date_created)}
          message={message.message}
          status={status}
          key={chatmate_id}
          active={active}
          handleClick={(e) => this.handleClick()}
        />
      );
    });

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

  handleClick() {

  }

  async handleListen(message) {
    const { loggedUser } = this.props.AppData;

    if (loggedUser.user_role === 'barangay_member') {
      await this.props.MessagingStore.receiveInboxMsg(message, loggedUser.user_id);
      if (this.props.receiverId === message.sender_id) {
        await this.props.MessagingStore.markAsRead(message.sender_id, loggedUser.user_id);
      }
    } else if (loggedUser.user_role === 'barangay_page_admin') {
      this.props.MessagingStore.receiveInboxMsg(message, loggedUser.barangay_page_name);
      if (this.props.receiverId === message.sender_id) {
        await this.props.MessagingStore.markAsRead(message.sender_id, loggedUser.barangay_page_id);
      }
    }
  }
}