import React, { Component } from 'react';
import { observer } from 'mobx-react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import SideBar from 'components/common/SideNav/Bar';
import SearchBar from './subcomponent/SearchBar';
import Home from 'assets/images/nav-home.png';
import Menu from 'assets/images/nav-menu.png';

import 'components/common/Nav/Bar.less';

@observer
export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.state = { searchHidden: true };
  }

  onSetSidebarOpen() {
    this.props.AppData.toggleSidebar();
  }

  showSearchbar() {
    this.setState((prevState) => ({ searchHidden: !prevState.searchHidden }));
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-collapse-sm navbar-dark fixed-top">
          {this.state.searchHidden && (
            <div className="d-flex d-md-none d-lg-none d-xl-none container">
              <div className="navbar-brand">
                <a href="/dashboard" className="nav-logo">
                  <img src={Home} alt="" />
                </a>
              </div>
              <ul className="navbar-nav right">
                <li className="nav-item">
                  <a className="nav-search nav-link" onClick={() => this.showSearchbar()}>
                    <FontAwesomeIcon icon={faSearch} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-menu nav-link" onClick={() => this.onSetSidebarOpen()}>
                    <img src={Menu} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          )}
          {!this.state.searchHidden && (
            <div className="d-flex d-md-none d-lg-none d-xl-none container">
              <ul className="navbar-nav sm-search-bar">
                <li className="nav-item">
                  <div className="nav-link">
                    <SearchBar history={this.props.history} />
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav right">
                <li className="nav-item">
                  <a className="nav-search nav-link" onClick={() => this.showSearchbar()}>
                    <h5>Cancel</h5>
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className="d-none d-md-flex d-lg-flex d-xl-flex container">
            <div className="navbar-brand mr-auto ">
              <a href="/dashboard" className="nav-logo">
                <img src={Home} alt="" />
              </a>
            </div>
            <ul className="navbar-nav">
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