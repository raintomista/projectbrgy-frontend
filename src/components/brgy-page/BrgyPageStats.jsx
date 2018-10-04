import React from 'react';
import { Link } from "react-router-dom";

import { observer } from 'mobx-react';

const BrgyPageStats = observer((props) => {
  const { BrgyPageStore } = props;
  const { data, viewType } = BrgyPageStore;
  const { stats } = BrgyPageStore.data;

  return (
    <div className="brgy-page-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className={`nav-item ${viewType === undefined ? 'active' : ''}`} >
            <Link className="nav-link" to={viewPosts(data.id)}>
              <span className="nav-item-title">Posts</span>
              <span className="nav-item-value">{stats.posts_count}</span>
            </Link>
          </li>
          <li className={`nav-item ${viewType === 'shared_posts' ? 'active' : ''}`}>
            <Link className="nav-link" to={viewSharedPosts(data.id)}>
              <span className="nav-item-title">Shared</span>
              <span className="nav-item-value">{stats.shared_posts_count}</span>
            </Link>
          </li>
          <li className={`nav-item ${viewType === 'followers_list' ? 'active' : ''}`}>
            <Link className="nav-link" to={viewFollowers(data.id)}>
              <span className="nav-item-title">Followers</span>
              <span className="nav-item-value">{stats.followers_count}</span>
            </Link>
          </li>
          <li className={`nav-item ${viewType === 'following_list' ? 'active' : ''}`}>
            <Link className="nav-link" to={viewFollowing(data.id)}>
              <span className="nav-item-title">Following</span>
              <span className="nav-item-value">{stats.following_count}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

const viewPosts = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}`
});

const viewSharedPosts = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}&view=shared_posts`
});

const viewFollowers = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}&view=followers_list`
});

const viewFollowing = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}&view=following_list`
});

export default BrgyPageStats;