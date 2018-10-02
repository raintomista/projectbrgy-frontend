import React, { Component } from 'react';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import API_HOST from 'config';

import NavBar from 'components/common/Nav/Bar';
import Inbox from './subcomponents/Inbox';
import Conversation from './subcomponents/Conversation';

import './MessagesView.less';

@observer
export default class MessagesView extends Component {
  socket = {};

  async componentWillMount() {
    await this.props.AppData.getUserDetails();
    await this.props.MessagingStore.getInbox();
    await this.props.MessagingStore.getUserDetails(this.props.match.params.id);
    this.connect();
  }

  async componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (prevProps.match.params.id !== id) {
      await this.props.MessagingStore.getUserDetails(id);
    }
  }

  render() {
    const { AppData, MessagingStore, history } = this.props;
    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={history} />
        <div className="messaging-container">
          <div className="row">
            <div className="col-md-4 inbox-container">
              <Inbox
                handleListen={(handler) => this.handleListen(handler)}
                MessagingStore={MessagingStore}
              />
            </div>
            <div className="col-md-8 conversation-container">
              {typeof this.props.match.params.id !== 'undefined' && (
                <Conversation
                  AppData={AppData}
                  handleSendMessage={(data) => this.handleSendMessage(data)}
                  handleListen={(handler) => this.handleListen(handler)}
                  history={this.props.history}
                  MessagingStore={MessagingStore}
                  receiverId={this.props.match.params.id}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  connect() {
    const token = localStorage.getItem('x-access-token');

    this.socket = io(API_HOST, {
      query: `token=${token}`
    }).connect();

    this.socket.on('connect', () => {
      const { loggedUser } = this.props.AppData;
      if (loggedUser.user_role === 'barangay_member') {
        this.socket.emit('setMessengerId', { messengerId: loggedUser.user_id });
      } else if (loggedUser.user_role === 'barangay_member_admin') {
        this.socket.emit('setMessengerId', { messengerId: loggedUser.user_barangay_id });
      }
    })
  }

  handleSendMessage(data) {
    this.socket.emit('client:message', data);
  }

  handleListen(handler) {
    this.socket.on('server:message', (data) => {
      handler(data);
    });
  }
}