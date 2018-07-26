import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import UserProfileNewsfeedView from '../components/profile/UserProfileNewsfeedView';
import queryString from 'query-string';
import './Profile.less';

export default class Profile extends Component {
  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.fetchProfileData(parsedQuery.id);
    console.log(this.props.AppData);
  }

  render() {
    return (
      <div>
        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Content Grid */}
        <div className="profile-content">
          <div className="container">
            <UserProfileNewsfeedView AppData={this.props.AppData} />
          </div>
        </div>
      </div>
    );
  }
}