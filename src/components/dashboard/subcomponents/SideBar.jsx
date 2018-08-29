import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

// Subcomponents
import SideBarAdminInfo from './InfoAdmin';
import SideBarMemberInfo from './InfoMember';
import SideBarAdminOptions from './OptionsAdmin';
import SideBarMemberOptions from './OptionsMember';

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
              imgSrc={'images/default-user.png'}
              handleViewUserProfile={this._handleViewUserProfile(loggedUser.user_id)}
              memberName={`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
              municipality={loggedUser.barangay_page_municipality}
            /> :
            <SideBarAdminInfo
              brgyName={loggedUser.barangay_page_name}
              handleViewBrgyPage={this._handleViewBrgyPage(loggedUser.barangay_page_id)}
              imgSrc={'images/default-brgy.png'}
              municipality={loggedUser.barangay_page_municipality}
            />
          }
        </div>

        {/* Sidebar Options */}
        {loggedUser.user_role === 'barangay_member' ?
          <SideBarMemberOptions
            brgyId={loggedUser.barangay_page_id}
            followingCount={loggedUser.stats.following_count}
            reportsCount={5}
            respondedCount={5}
          /> :
          <SideBarAdminOptions
            adminName={`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
            eResourcesCount={11}
            eServicesCount={11}
            followersCount={loggedUser.stats.follower_count}
            messageCount={5}
            residentCount={143}
          />
        }
      </div>
    );
  }

  _handleViewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    };
  }

  _handleViewUserProfile(userId){
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}

DashboardSideBar.propTypes = {
  AppData: PropTypes.object
}
