import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { observer } from 'mobx-react';
import Loader from 'assets/images/loader.svg';
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
    const {
      pageStart,
      inbox,
      inboxHasMore,
    } = this.props.MessagingStore;

    const items = inbox.map((message, index) => {
      let chatmate_id, status, logged_user_id;

      if (loggedUser.user_role === 'barangay_member') {
        chatmate_id = loggedUser.user_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.user_id === message.sender_id ? message.sender_status : message.receiver_status;
        logged_user_id = loggedUser.user_id;
      } else if (loggedUser.user_role === 'barangay_page_admin') {
        chatmate_id = loggedUser.barangay_page_id === message.sender_id ? message.receiver_id : message.sender_id;
        status = loggedUser.barangay_page_id === message.sender_id ? message.sender_status : message.receiver_status;
        logged_user_id = loggedUser.barangay_page_id;
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
          handleClick={(e) => this.props.MessagingStore.markAsRead(message.receiver_id, logged_user_id)}
        />
      );
    });

    return (
      <div className="messaging-inbox">
        <div className="header">
          <h5>Messages</h5>
        </div>
        <div className="messages">
          <InfiniteScroll
            pageStart={pageStart}
            loadMore={(page) => this.loadMore(page)}
            hasMore={inboxHasMore}
            useWindow={false}
            loader={this.renderLoader()}
            threshold={10}
            ref={(scroll) => { this.scroll = scroll; }}
          >
            {items}
          </InfiniteScroll>
        </div>
      </div>
    );
  }

  formatDate(date) {
    return moment(date).fromNow();
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

  async loadMore(page) {
    await this.props.MessagingStore.getInbox(page);
  }

  renderLoader() {
    return (
      <div key={0} className="content-loader">
        <object data={Loader} type="image/svg+xml">
        </object>
      </div>
    );
  }
}