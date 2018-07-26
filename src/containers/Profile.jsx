import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';

/*--------------- User Profile Views ---------------*/
import UserProfileExpandedView from '../components/profile/UserProfileExpandedView';
import UserProfileFollowingListView from '../components/profile/UserProfileFollowingListView';
import UserProfileNewsfeedView from '../components/profile/UserProfileNewsfeedView';

/*--------------- Utilities ---------------*/
import queryString from 'query-string';
import { observer } from 'mobx-react';

import './Profile.less';

@observer
export default class Profile extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.fetchUserProfileData(parsedQuery.id);
    this.props.AppData.setProfileView(parsedQuery.view);
  }

  componentDidUpdate() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.setProfileView(parsedQuery.view);
  }

  profileView() {
    const { AppData } = this.props;
    const loggedUser = AppData.loggedUser;
    const profileData = AppData.profileData;

    if (loggedUser && profileData) {
      /* 
        Checks if loggedUser is a barangay member that views other user
        If true, a limited view will be displayed to the user
        Otherwise, the other views can be displayed
      */
      if (loggedUser.role === 'barangay_member' && loggedUser.id !== profileData.user_id) {
        return (
          <UserProfileExpandedView AppData={this.props.AppData} />
        );
      } else {

        //Expanded Details View
        if (AppData.profileViewType === 'expanded_details') {
          return <UserProfileExpandedView AppData={this.props.AppData} />;
        }

        else if (AppData.profileViewType === 'following_list') {
          this.props.AppData.fetchUserFollowingList(loggedUser.id);
          return <UserProfileFollowingListView AppData={this.props.AppData} history={this.props.history} />;
        }
        else {
          return <UserProfileNewsfeedView AppData={this.props.AppData} history={this.props.history} />;
        }
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