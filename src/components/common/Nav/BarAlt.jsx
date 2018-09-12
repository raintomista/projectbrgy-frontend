import React, { Component } from 'react';

import Home from 'assets/images/nav-home.png';

import { Link } from "react-router-dom";
import 'components/common/Nav/Bar.less';

export default class NavBarAlt extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark">
          <div className="mx-auto order-0">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav">
                <Link to="/login" className="nav-logo">
                  <img src={Home} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}