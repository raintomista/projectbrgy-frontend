import React from 'react';
import { Link } from "react-router-dom";

import 'components/profile/UserProfileStats.less';

const UserProfileStats = (props) => {
  const { UserProfileStore } = props;
  const { data, viewType } = UserProfileStore;

  return (
    <div className="user-profile-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className={`nav-item ${viewType === undefined ? 'active' : '' }`}>
            <Link className="nav-link" to={viewTimeline(data.user_id)}>
              <span className="nav-item-title">Share</span>
              <span className="nav-item-value">1,438</span>
            </Link>
          </li>
          <li className={`nav-item ${viewType === 'following_list' ? 'active' : '' }`}>
            <Link className="nav-link" to={viewFollowing(data.user_id)}>
              <span className="nav-item-title">Following</span>
              <span className="nav-item-value">50</span>
            </Link>
          </li>
          <li className="filler nav-item"></li>
          <li className="filler nav-item"></li>
        </ul>
      </div>
    </div>
  );
}

const viewTimeline = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}`
});

const viewFollowing = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}&view=following_list`
});

export default UserProfileStats;