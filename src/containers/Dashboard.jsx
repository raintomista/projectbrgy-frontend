import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import DashboardFeedCard from '../components/dashboard/DashboardFeedCard';
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
                <DashboardSidebar type="user" loggedUser="Juan Dela Cruz" barangay="Barangay 20" city="Caloocan City" />
              </div>
              <div className="col-md-6">
                <DashboardFeedCard 
                  imgSrc="images/default-brgy.png"
                  authorName="Barangay 69"
                  city="Caloocan City"
                  date={new Date()}
                />
                <DashboardFeedCard
                  imgSrc="images/default-user.png"
                  authorName="Barangay 35"
                  city="Caloocan City"
                  date={new Date(2018, 5, 19, 3, 0, 10)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}