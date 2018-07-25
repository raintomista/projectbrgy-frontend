import React from 'react';
import { Link } from "react-router-dom";

const UserProfileStats = (props) => {
  return (
    <div className="user-profile-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className="nav-item">
            <Link className="nav-link" to=''>
              <span className="nav-item-title">Share</span>
              <span className="nav-item-value">1,438</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to=''>
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


export default UserProfileStats;