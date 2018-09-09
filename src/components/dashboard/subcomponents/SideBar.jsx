import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

// Subcomponents
import SideBarAdminInfo from './InfoAdmin';
import SideBarMemberInfo from './InfoMember';
import SideBarAdminOptions from './OptionsAdmin';
import SideBarMemberOptions from './OptionsMember';

import BrgyMemberAvatar from 'assets/images/default-user.png';
import BrgyPageAvatar from 'assets/images/default-brgy.png';


// Styles
import './SideBar.less';

@observer
export default class DashboardSideBar extends Component {
  render() {
    const { AppData } = this.props;
    const { loggedUser } = AppData;

    return (
      <div className="dashboard-sidebar card">
        <div className="card-body">
          {/* Sidebar Logged User Info */}
          {loggedUser.user_role === 'barangay_member' ?
            <SideBarMemberInfo
              brgyName={loggedUser.barangay_page_name}
              imgSrc={BrgyMemberAvatar}
              handleViewUserProfile={this._handleViewUserProfile(loggedUser.user_id)}
              memberName={`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
              municipality={loggedUser.barangay_page_municipality}
            /> :
            <SideBarAdminInfo
              brgyName={loggedUser.barangay_page_name}
              handleViewBrgyPage={this._handleViewBrgyPage(loggedUser.barangay_page_id)}
              imgSrc={BrgyPageAvatar}
              municipality={loggedUser.barangay_page_municipality}
            />
          }
        </div>

        {/* Sidebar Options */}
        {loggedUser.user_role === 'barangay_member' ?
          <SideBarMemberOptions
            followingCount={loggedUser.stats.following_count}
            handleViewBrgyPage={this._handleViewBrgyPage(loggedUser.barangay_page_id)}
            handleViewUserFollowingList={this._handleViewUserFollowingList(loggedUser.user_id)}
            handleViewUserReports={this._handleViewUserReports(loggedUser.user_id)}
            reportsCount={loggedUser.stats.reports_count}
            respondedCount={loggedUser.stats.responded_count}
          /> :
          <SideBarAdminOptions
            adminName={`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
            eResourcesCount={11}
            eServicesCount={11}
            followersCount={loggedUser.stats.follower_count}
            handleViewBrgyFollowersList={this._handleViewBrgyFollowersList(loggedUser.barangay_page_id)}
            messageCount={5}
            residentCount={143}
          />
        }
      </div>
    );
  }

  _handleViewBrgyFollowersList(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}&view=followers_list`
    };
  }

  _handleViewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    };
  }

  _handleViewUserFollowingList(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}&view=following_list`
    };
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }

  _handleViewUserReports() {
    return {
      pathname: `/my-reports`,
    };
  }
}

DashboardSideBar.propTypes = {
  AppData: PropTypes.object
}
