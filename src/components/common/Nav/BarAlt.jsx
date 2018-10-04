import React, { Component } from 'react';
import Home from 'assets/images/nav-home.png';
import 'components/common/Nav/Bar.less';

export default class NavBarAlt extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-collapse-sm navbar-dark fixed-top">
          <div className="container">
            <div className="navbar-brand mr-auto ">
              <a href="/login" className="nav-logo">
                <img src={Home} alt="" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}