import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import InfiniteScroll from 'react-infinite-scroller';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPaperPlane from '@fortawesome/fontawesome-free-solid/faPaperPlane'
import { observer } from 'mobx-react';
import moment from 'moment';


import RootStore from 'stores/RootStore';
import './Conversation.less';

@observer
export default class Conversation extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.handleListen((message) => this.handleListen(message));
    }, 1000);
  }

  render() {
    const {
      inputDisabled,
      inputValue,
      pageStart,
      hasMore,
      messages
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
          <h5>Juan Dela Cruz</h5>
        </div>
        <div className="messages" id="messages">
          <InfiniteScroll
            pageStart={pageStart}
            loadMore={(page) => this.loadMore(page)}
            hasMore={hasMore}
            loader={this.renderLoader()}
            style={{ padding: '20px' }}
            useWindow={false}
            isReverse={true}
            threshold={10}
          >
            {items}
          </InfiniteScroll>
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)} className="message-box">
          <input type="text"
            name="message"
            onChange={(e) => this.handleChange(e)}
            value={inputValue}
            placeholder="Type a message..."
            disabled={inputDisabled}
            maxLength={200}
            autoComplete="off"
          />
          <button type="submit" disabled={inputDisabled} title="Send">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    );
  }

  async loadMore(page) {
    RootStore.MessagingStore.getConversationMessages(page, this.props.receiverId);
    if (page < 3) {
      this.scrollToBottom();
    }
  }

  renderLoader() {
    return <div key={0}>Loading...</div>;
  }

  handleChange(e) {
    this.props.MessagingStore.inputChange(e.target.value);
  }

  async handleEnter(e) {
    if (e.key === 'Enter') {
      const message = e.target.value.trim();
      const { receiverId, handleSendMessage } = this.props;
      if (message.length > 0) {
        await this.props.MessagingStore.sendMsg(message, receiverId, handleSendMessage);
        this.scrollToBottom();
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.persist();
    const message = e.target.message.value.trim();
    const { receiverId, handleSendMessage } = this.props;
    if (message.length > 0) {
      await this.props.MessagingStore.sendMsg(message, receiverId, handleSendMessage);
      this.scrollToBottom();
    }
  }

  async handleListen(message) {
    await this.props.MessagingStore.receiveMsg(message);
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "messages",
      delay: 0,
      duration: 0
    });
  }
}