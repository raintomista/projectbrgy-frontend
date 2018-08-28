import React, { Component } from 'react';

/*--------------- Components ---------------*/
import Sidebar from 'react-sidebar';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';

/*--------------- Stylesheets ---------------*/
import 'components/common/SideNav/Bar.less';
@observer
export default class SideBar extends Component {
  render() {
    const { AppData, onSetOpen } = this.props;

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

  setContent(){
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">General Info</li>
        <li className="list-group-item">Advanced Settings</li>
        <li className="list-group-item">About AETech</li>
        <li className="list-group-item">About B2P</li>
        <li className="list-group-item">Contact Technical Support</li>
        <li className="list-group-item button-item">
          <a className="btn rounded">Log Out</a>
        </li>
      </ul>
    );
  }

  setStyle(){
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
}