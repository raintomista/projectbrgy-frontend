import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/*--------------- Components ---------------*/
import Sidebar from 'react-sidebar';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';

import { signOutUser } from 'services/SignupService';

/*--------------- Stylesheets ---------------*/
import 'components/common/SideNav/Bar.less';

@observer
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    }
  }
  render() {
    const { AppData, onSetOpen } = this.props;
    const { authenticated } = this.state;

    if (!authenticated) {
      return <Redirect to='/login' />
    }

    return (
      <Sidebar
        children=""
        sidebarClassName="sidebar"
        onSetOpen={onSetOpen}
        open={AppData.isSidebarOpen}
        pullRight={true}
        sidebar={this.setContent()}
        shadow={false}
        styles={this.setStyle()}
      >
      </Sidebar>
    );
  }

  setContent() {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">General Info</li>
        <li className="list-group-item">Advanced Settings</li>
        <li className="list-group-item">About AETech</li>
        <li className="list-group-item">About B2P</li>
        <li className="list-group-item">Contact Technical Support</li>
        <li className="list-group-item button-item">
          <a className="btn rounded" onClick={(e) => this.logOut()}>Log Out</a>
        </li>
      </ul>
    );
  }

  setStyle() {
    return {
      sidebar: {
        position: 'fixed',
        background: 'linear-gradient(#2a8abd, 65%, #226cc1)',
        width: '260px',
        zIndex: 2
      },
      overlay: {
        backgroundColor: 'rgba(255, 243, 243, 0.3)'
      },
      content: {
        overflowY: 'none'
      }
    }
  }

  async logOut() {
    try {
      await signOutUser();
      this.setState({ authenticated: false });
      this.props.AppData.toggleSidebar();
      this.props.AppData.logout();
      localStorage.clear();            
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }
}