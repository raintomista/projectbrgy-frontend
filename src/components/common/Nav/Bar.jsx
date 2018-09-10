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
        <nav className="navbar navbar-expand-md fixed-top navbar-dark">
          <div className="mx-auto order-0">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav">
                <Link to="/dashboard" className="nav-logo">
                  <img src={Home} alt="" />
                </Link>
              </div>
              <div className="form-inline my-2 my-lg-0">
                <SearchBar history={this.props.history}/>
              </div>
              <div className="navbar-nav">
                <a onClick={() => this.onSetSidebarOpen()} className="nav-menu">
                  <img src={Menu} alt="" />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <SideBar {...this.props} onSetOpen={this.onSetSidebarOpen} />
      </div>
    );
  }
}