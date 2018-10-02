import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import InfiniteScroll from 'react-infinite-scroller';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPaperPlane from '@fortawesome/fontawesome-free-solid/faPaperPlane'
import { observer } from 'mobx-react';
import moment from 'moment';

import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
import './Conversation.less';

@observer
export default class Conversation extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.handleListen((message) => this.handleListen(message));
    }, 1000);
  }

  componentWillUnmount() {
    RootStore.MessagingStore.resetConvo();
  }

  render() {
    const {
      inputDisabled,
      inputValue,
      pageStart,
      hasMore,
      messages,
      user,
      conversationLoading
    } = RootStore.MessagingStore;

    const items = [];
    messages.map((msg, index) => (
      items.unshift(
        <div
          className={`message-container ${msg.sender_id === this.props.receiverId ? 'received' : ''}`}
          key={msg.id}
        >
          <div className="message" title={moment(msg.date_created).format('MMM DD, YYYY hh:mm:ss a')}>
            {msg.message}
          </div>
        </div>
      )
    ));

    return (
      <div className="messaging-conversation">
        <div className="header">
          {user && !user.hasOwnProperty('barangay_name') && (
            <h5>{user.user_first_name} {user.user_last_name}</h5>
          )}
          {user && user.hasOwnProperty('barangay_name') && (
            <h5>{user.barangay_name}</h5>
          )}
        </div>
        {conversationLoading && (
          <div className="conversation-loading">
            <div className="loader">
              <object data={Loader} type="image/svg+xml">
              </object>
            </div>
          </div>
        )}
        {!conversationLoading && (
          <div className="conversation" id="conversation" onScroll={(e) => this.handleScroll(e)}>
            <InfiniteScroll
              pageStart={pageStart}
              loadMore={(page) => this.loadMore(page)}
              hasMore={hasMore}
              loader={this.renderLoader()}
              style={{ padding: '20px' }}
              useWindow={false}
              isReverse={true}
              threshold={10}
              ref={(scroll) => { this.scroll = scroll; }}
            >
              {items}
            </InfiniteScroll>
          </div>
        )}
        <form onSubmit={(e) => this.handleSubmit(e)} className="message-box">
          <input type="text"
            name="message"
            onChange={(e) => this.handleChange(e)}
            value={inputValue}
            placeholder="Type a message..."
            disabled={conversationLoading || inputDisabled}
            maxLength={200}
            autoComplete="off"
          />
          <button type="submit" disabled={conversationLoading || inputDisabled} title="Send">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    );
  }

  async loadMore(page) {
    RootStore.MessagingStore.getConversationMessages(page, this.props.receiverId, this.props.history);

    if (!RootStore.MessagingStore.hasScrolled) {
      this.scrollToBottom()
    }
  }

  renderLoader() {
    return <div key={0}>Loading...</div>;
  }

  getLoggedUser() {
    const { loggedUser } = this.props.AppData;
    const { user_first_name, user_last_name } = loggedUser;
    return {
      sender_first_name: user_first_name,
      sender_last_name: user_last_name
    };
  }

  handleChange(e) {
    this.props.MessagingStore.inputChange(e.target.value);
  }

  async handleEnter(e) {
    if (e.key === 'Enter') {
      const message = e.target.value.trim();
      const { receiverId, handleSendMessage } = this.props;
      const sender_name = this.getLoggedUser();
      if (message.length > 0) {
        await this.props.MessagingStore.sendMsg(message, receiverId, sender_name, handleSendMessage);
        this.scrollToBottom();
      }
    }
  }

  handleScroll(e) {
    this.props.MessagingStore.setScrolled(true);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    const { receiverId, handleSendMessage } = this.props;    
    const { loggedUser } = this.props.AppData;

    const message = e.target.message.value.trim();
    const sender_id = loggedUser.user_role === 'barangay_member' ? loggedUser.user_id : loggedUser.barangay_page_name;
    const sender_name = {
      sender_first_name: loggedUser.user_first_name,
      sender_last_name: loggedUser.user_last_name
    }


    if (message.length > 0) {
      await this.props.MessagingStore.sendMsg(message, receiverId, sender_name, sender_id, handleSendMessage);
      this.scrollToBottom();
    }
  }

  async handleListen(message) {
    await this.props.MessagingStore.receiveMsg(message);
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "conversation",
      delay: 0,
      duration: 0
    });
  }
}