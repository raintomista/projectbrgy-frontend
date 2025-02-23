import React from 'react';
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import 'components/profile/UserProfileStats.less';

const UserProfileStats = observer((props) => {
  const { UserProfileStore } = props;
  const { data, viewType } = UserProfileStore;
  const { stats } = data;

  return (
    <div className="user-profile-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className={`nav-item ${viewType === undefined ? 'active' : '' }`}>
            <Link className="nav-link" to={viewTimeline(data.user_id)}>
              <span className="nav-item-title">Share</span>
              <span className="nav-item-value">{stats.shared_posts_count}</span>
            </Link>
          </li>
          <li className={`nav-item ${viewType === 'following_list' ? 'active' : '' }`}>
            <Link className="nav-link" to={viewFollowing(data.user_id)}>
              <span className="nav-item-title">Following</span>
              <span className="nav-item-value">{stats.following_count}</span>
            </Link>
          </li>
          <li className="filler nav-item"></li>
          <li className="filler nav-item"></li>
        </ul>
      </div>
    </div>
  );
});

const viewTimeline = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}`
});

const viewFollowing = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}&view=following_list`
});

export default UserProfileStats;