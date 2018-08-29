import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

// Subcomponents
import SideBarAdminInfo from './InfoAdmin';
import SideBarMemberInfo from './InfoMember';
import SideBarAdminOptions from './OptionsAdmin';
import SideBarMemberOptions from './OptionsMember';

// Styles
import './SideBar.less';

const DashboardSideBar = observer((props) => {
  const { AppData } = props;
  const { loggedUser } = AppData;

  console.log(loggedUser);

  return (
    <div className="dashboard-sidebar card">
      <div className="card-body">
        {/* Sidebar Logged User Info */}
        {loggedUser.user_role === 'barangay_member' ?
          <SideBarMemberInfo
            brgyName={loggedUser.barangay_page_name}
            imgSrc={'images/default-user.png'}
            memberId={loggedUser.user_id}
            memberName={`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
            municipality={loggedUser.barangay_page_municipality}
          /> :
          <SideBarAdminInfo
            brgyId={loggedUser.barangay_page_id}
            brgyName={loggedUser.barangay_page_name}
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
});

DashboardSideBar.propTypes = {
  AppData: PropTypes.object
}

export default DashboardSideBar;