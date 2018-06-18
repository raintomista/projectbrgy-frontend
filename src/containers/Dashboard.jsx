import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import DashboardSidebar from 'components/dashboard/DashboardSidebar';
import 'stylesheets/containers/Dashboard.less';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <DashboardSidebar type="user" loggedUser="Juan Dela Cruz" barangay="Barangay 20" city="Caloocan City"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}