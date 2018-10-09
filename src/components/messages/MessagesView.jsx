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
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      statusHidden: false,
    }
  }

  async componentWillMount() {
    await this.props.AppData.getUserDetails();

    const id = this.props.match.params.id;
    const history = this.props.history;
    const { AppData } = this.props;
    const { loggedUser } = AppData;

    if (typeof id !== 'undefined') {
      if (loggedUser.user_role === 'barangay_page_admin') {
        await this.props.MessagingStore.getBarangayDetails(id, history);
        await this.props.MessagingStore.markAsRead(id, loggedUser.barangay_page_id);
      } else if (loggedUser.user_role === 'barangay_member') {
        await this.props.MessagingStore.getUserDetails(id, history);
        await this.props.MessagingStore.markAsRead(id, loggedUser.user_id);
      }
    }
    this.connect();
  }

  componentDidMount() {
    document.title = 'Messages - B2P';
  }

  async componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    const history = this.props.history;
    const { AppData } = this.props;
    const { loggedUser } = AppData;

    if (prevProps.match.params.id !== id && typeof id !== 'undefined') {
      if (loggedUser.user_role === 'barangay_page_admin') {
        await this.props.MessagingStore.getBarangayDetails(id, history);
      } else if (loggedUser.user_role === 'barangay_member') {
        await this.props.MessagingStore.getUserDetails(id, history);
      }
    }
  }

  async componentWillUnmount() {
    this.props.MessagingStore.resetMessaging();
  }

  render() {
    const id = this.props.match.params.id;
    const { AppData, MessagingStore, history } = this.props;
    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={history} />
        <div className="messaging-container">
          <div className="row">
            <div className={`${typeof id !== 'undefined' ? 'd-none' : ''} d-md-block col-md-5  col-lg-4 col-xl-3 inbox-container`}>
              <Inbox
                AppData={AppData}
                handleListen={(handler) => this.handleListen(handler)}
                MessagingStore={MessagingStore}
                receiverId={this.props.match.params.id}
              />
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9 conversation-container">
              {typeof this.props.match.params.id !== 'undefined' && (
                <Conversation
                  AppData={AppData}
                  connected={this.state.connected}
                  statusHidden={this.state.statusHidden}
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
      this.setState({ connected: true });
      if (loggedUser.user_role === 'barangay_member') {
        this.socket.emit('setMessengerId', { messengerId: loggedUser.user_id });
      } else if (loggedUser.user_role === 'barangay_member_admin') {
        this.socket.emit('setMessengerId', { messengerId: loggedUser.user_barangay_id });
      }

      setTimeout(() => {
        this.setState({ statusHidden: true })
      }, 1000);
    });

    this.socket.on('disconnect', () => {
      this.setState({ connected: false, statusHidden: false });
    });
  }

  handleSendMessage(data) {
    if (this.state.connected) {
      this.socket.emit('client:message', data);
    }
  }

  handleListen(handler) {
    if (this.state.connected) {
      this.socket.on('server:message', (data) => {
        handler(data);
      });
    }
  }
}