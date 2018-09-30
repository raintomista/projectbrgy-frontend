import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Form from './Form';
import './Conversation.less';

@observer
export default class Conversation extends Component {
  constructor(props) {
    super(props);
    this.form = new Form();
  }
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
      this.form.onSubmit(e);
    }
  }
}