import React, { Component } from 'react';
import DashboardFeedCard from '../components/dashboard/DashboardFeedCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import UserProfileDetails from '../components/profile/UserProfileDetails';
import UserProfileStats from '../components/profile/UserProfileStats';
import './Profile.less';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Content Grid */}
        <div className="profile-content">
          <div className="container">
            <div className="row">
              {/* User Profile Details Section (Left) */}
              <div className="col-md-3">
                <UserProfileDetails />
              </div>

              {/* User Profile Stats and Newsfeed Section (Middle) */}
              <div className="col-md-6">
                <UserProfileStats />
                <DashboardFeedCard
                  imgSrc="images/default-brgy.png"
                  authorName="Barangay 69"
                  city="Caloocan City"
                  date={new Date()}
                />
                <DashboardFeedCard
                  imgSrc="images/default-brgy.png"
                  authorName="Barangay 69"
                  city="Caloocan City"
                  date={new Date()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}