import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import DashboardPostBox from 'components/dashboard/DashboardPostBox';
import DashboardSidebar from 'components/dashboard/DashboardSidebar';
import NewsFeedOptions from 'components/dashboard/NewsFeedOptions';

import { getUser, getBarangayById, signOutUser } from 'services/SignupService';

import { Redirect } from 'react-router-dom'

import 'stylesheets/containers/Dashboard.less';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedUser: null, logged: true }
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('x-access-token');
    this.getUserDetails(token);
  }

  async getUserDetails(token) {
    try {
      // Get User Details
      let response = await getUser(token);
      const { id, first_name, last_name, role, barangay_id } = response.data.data;

      // Get Barangay Details
      response = await getBarangayById(barangay_id);
      const { name, municipality } = response.data.data;

      // Create Logged User Details
      const loggedUser = {
        id,
        name: `${first_name} ${last_name}`,
        barangay: name,
        municipality,
        role,
      }

      this.setState({ loggedUser })
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleSignOut() {
    await signOutUser();
    this.setState({ logged: false })
  }

  render() {
    const loggedUser = this.state.loggedUser;
    return (
      <div>
        {this.state.logged === false && <Redirect to='/login' />}
        <NavBar handleSignOut={this.handleSignOut} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <DashboardSidebar loggedUser={loggedUser} />
              </div>
              <div className="col-md-6">
                <DashboardPostBox loggedUser={loggedUser} />
                <NewsFeedOptions />
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