import React from 'react';
import { Link } from "react-router-dom";

const BrgyPageStats = (props) => {
  return (
    <div className="brgy-page-stats card">
      <div className="card-body">
        <ul className="nav justify-content-center nav-fill">
          <li className="nav-item">
            <Link className="nav-link" to=''>
              <span className="nav-item-title">Posts</span>
              <span className="nav-item-value">1,438</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to=''>
              <span className="nav-item-title">Followers</span>
              <span className="nav-item-value">10,330</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to=''>
              <span className="nav-item-title">Following</span>
              <span className="nav-item-value">50</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to=''>
              <span className="nav-item-title">Events</span>
              <span className="nav-item-value">2</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default BrgyPageStats;