/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- User Profile Views ---------------*/
import UserProfileExpandedView from '../components/profile/UserProfileExpandedView';
import UserProfileFollowingListView from '../components/profile/UserProfileFollowingListView';
import UserProfileNewsfeedView from '../components/profile/UserProfileNewsfeedView';

/*--------------- Components ---------------*/
import NavBar from 'components/common/NavBar';
import ProfileHeader from 'components/profile/ProfileHeader';

/*--------------- Utilities ---------------*/
import queryString from 'query-string';
import { observer } from 'mobx-react';

/*--------------- Stylesheets ---------------*/
import 'containers/Profile.less';

@observer
export default class Profile extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.UserProfileStore.fetchUserProfileData(parsedQuery.id);
    this.props.UserProfileStore.setProfileView(parsedQuery.view);
  }

  componentDidUpdate() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.UserProfileStore.setProfileView(parsedQuery.view);
  }

  profileView() {
    const { AppData, UserProfileStore } = this.props;
    const loggedUser = AppData.loggedUser;
    const { data, viewType } = UserProfileStore;

    if (loggedUser && data) {
      /* 
        Checks if loggedUser is a barangay member that views other user
        If true, a limited view will be displayed to the user
        Otherwise, the other views can be displayed
      */
      if (loggedUser.role === 'barangay_member' && loggedUser.id !== data.user_id) {
        return (
          <UserProfileExpandedView AppData={AppData} UserProfileStore={UserProfileStore} />
        );
      } else {

        //Expanded Details View
        if (viewType === 'expanded_details') {
          return <UserProfileExpandedView AppData={AppData} UserProfileStore={UserProfileStore} />;
        }

        else if (viewType === 'following_list') {
          UserProfileStore.fetchUserFollowingList(data.user_id);
          return <UserProfileFollowingListView AppData={AppData} UserProfileStore={UserProfileStore} history={this.props.history} />;
        }
        else {
          return <UserProfileNewsfeedView AppData={AppData} UserProfileStore={UserProfileStore} history={this.props.history} />;
        }
      }
    }
  }

  render() {
    const { AppData } = this.props;
    return (
      <div>
        <NavBar AppData={AppData} />
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