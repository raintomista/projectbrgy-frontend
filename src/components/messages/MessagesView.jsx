import React, { Component } from 'react';
import NavBar from 'components/common/Nav/Bar';
import Inbox from './subcomponents/Inbox';
import Conversation from './subcomponents/Conversation';
import './MessagesView.less';


export default class MessagesView extends Component {

  render() {
    const { AppData, history } = this.props;
    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={history} />
        <div className="messaging-container">
          <div className="row">
            <div className="col-md-4 inbox-container">
              <Inbox />
            </div>
            <div className="col-md-8 conversation-container">
              <Conversation />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}