import React, { Component } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import UserProfileStats from '../components/profile/UserProfileStats';

import './Profile.less';

export default class Profile extends Component {
  render() {
    return (
      <div>
        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Content Grid */}
        <div className="profile-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
              </div>
              <div className="col-md-6">
                <UserProfileStats />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}