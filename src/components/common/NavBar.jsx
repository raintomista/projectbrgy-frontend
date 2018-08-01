/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- Components ---------------*/
import SideBar from 'components/common/SideBar';

/*--------------- Utilities ---------------*/
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';

@observer
export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    this.props.AppData.toggleSidebar();
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'visible' : 'hidden';
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
                  <img src="images/nav-logo.png" alt="" />
                </Link>
              </div>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              </form>
              <div className="navbar-nav">
                <a onClick={() => this.onSetSidebarOpen()} className="nav-menu">
                  <img src="images/nav-menu.png" alt="" />
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