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
      let id = null;
      let status = 'unread';

      if (loggedUser.user_role === 'barangay_page_admin') {
        id = loggedUser.barangay_page_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.barangay_page_id === message.sender_id ? message.sender_status : message.receiver_status;
      } else if (loggedUser.user_role === 'barangay_member') {
        id = loggedUser.user_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.user_id === message.sender_id ? message.sender_status : message.receiver_status;
      }
      return (
        <Message
          authorId={id}
          user_first_name={message.sender_first_name}
          user_last_name={message.sender_last_name}
          dateCreated={this.formatDate(message.date_created)}
          message={message.message}
          status={status}
          key={id}
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

  handleListen(message) {
    const loggedUser = this.props.AppData.loggedUser;
    const logged_user = loggedUser.user_role === 'barangay_member' ? loggedUser.user_id : loggedUser.barangay_page_name;
    this.props.MessagingStore.receiveInboxMsg(message, logged_user);
  }
}