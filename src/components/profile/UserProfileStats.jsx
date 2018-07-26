import React from 'react';
import { Link } from "react-router-dom";

import 'components/profile/UserProfileStats.less';

const UserProfileStats = (props) => {
  return (
    <div className="user-profile-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className="nav-item">
            <Link className="nav-link" to={viewTimeline(props.profileId)}>
              <span className="nav-item-title">Share</span>
              <span className="nav-item-value">1,438</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={viewFollowing(props.profileId)}>
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