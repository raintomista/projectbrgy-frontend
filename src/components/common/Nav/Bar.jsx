/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- Components ---------------*/
import SideBar from 'components/common/SideNav/Bar';

/*--------------- Nav Images ---------------*/
import Home from 'assets/images/nav-home.png';
import Menu from 'assets/images/nav-menu.png';

/*--------------- Utilities ---------------*/
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';


import SearchBar from './subcomponent/SearchBar';

/*--------------- Stylesheets ---------------*/
import 'components/common/Nav/Bar.less';

@observer
export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    this.props.AppData.toggleSidebar();
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-collapse-sm navbar-dark fixed-top">
          <div className="container">
            <div className="navbar-brand mr-auto ">
              <a href="/dashboard" className="nav-logo">
                <img src={Home} alt="" />
              </a>
            </div>
            <ul className="d-none d-md-block navbar-nav">
              <li className="nav-item">
                <div className="nav-link">
                  <SearchBar history={this.props.history} />
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-menu nav-link" onClick={() => this.onSetSidebarOpen()}>
                  <img src={Menu} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <SideBar {...this.props} onSetOpen={this.onSetSidebarOpen} />
      </div>
    );
  }
}