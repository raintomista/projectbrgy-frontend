import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import UserProfileExpandedView from '../components/profile/UserProfileExpandedView';
import UserProfileNewsfeedView from '../components/profile/UserProfileNewsfeedView';
import queryString from 'query-string';

import { observer } from 'mobx-react';

import './Profile.less';

@observer
export default class Profile extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.fetchProfileData(parsedQuery.id);
  }

  profileView() {
    const { AppData } = this.props;
    const loggedUser = AppData.loggedUser;
    const profileData = AppData.profileData;

    if (loggedUser && profileData) {
      /* 
        Checks if loggedUser is a barangay member that views other user
        If true, a limited view will be displayed to the user
        Otherwise, the newsfeed view will be displayed
      */
      if (loggedUser.role === 'barangay_member' && loggedUser.id !== profileData.user_id) {
        return (
          <UserProfileExpandedView AppData={this.props.AppData} />
        );
      } else {
        return (
          <UserProfileNewsfeedView AppData={this.props.AppData} />
        );
      }
    }
  }

  render() {
    return (
      <div>
        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Content Grid */}
        <div className="profile-content">
          <div className="container">
            {this.profileView()}
          </div>
        </div>
      </div>
    );
  }
}