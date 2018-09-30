import React, { Component } from 'react';
import NavBar from 'components/common/Nav/Bar';
import Inbox from './subcomponents/Inbox';
import './MessagesView.less';


export default class MessagesView extends Component {
  render() {
    const { AppData, history } = this.props;
    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={history} />
        <div className="messaging-container">
          <div className="row">
            <div className="col-md-4">
              <Inbox />
            </div>
            <div className="col-md-8">
              UHDUahda
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}