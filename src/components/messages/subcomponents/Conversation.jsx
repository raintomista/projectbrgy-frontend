import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import InfiniteScroll from 'react-infinite-scroller';

import { observer } from 'mobx-react';

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
          <div className="message" >
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
        <div className="message-box">
          <input type="text"
            onKeyPress={(e) => this.handleEnter(e)}
            onChange={(e) => this.handleChange(e)}
            value={inputValue}
            placeholder="Type a message..."
            disabled={inputDisabled}
          />
        </div>
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