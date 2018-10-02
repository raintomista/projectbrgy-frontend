import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import './Options.less';

const OptionsMember = observer((props) => {
  return (
    <ul className="dashboard-sidebar-options list-group list-group-flush">
      <li className="list-group-item">
        <Link to={props.handleViewBrgyPage} className="card-link">My Barangay</Link>
        <span className="badge"></span>
      </li>
      <li className="list-group-item">
        <Link to='/messages' className="card-link">Messages</Link>
        <span className="badge">{props.messageCount > 0 && props.messageCount}</span>
      </li>

      <li className="list-group-item">
        <Link to={props.handleViewUserFollowingList} className="card-link">Following</Link>
        <span className="badge">{props.followingCount > 0 && props.followingCount}</span>
      </li>
      <li className="list-group-item">
        <Link to={props.handleViewUserReports} className="card-link">Reports</Link>
        <span className="badge">{props.reportsCount > 0 && props.reportsCount}</span>
      </li>
      <li className="list-group-item">
        <Link to='/dashboard/my-reports/responded' className="card-link">Responded</Link>
        <span className="badge">{props.respondedCount > 0 && props.respondedCount}</span>
      </li>

      <li className="list-group-item"></li>
    </ul>
  );
});

OptionsMember.propTypes = {
  followingCount: PropTypes.number,
  handleViewBrgyPage: PropTypes.object,
  handleViewUserFollowingList: PropTypes.object,
  handleViewUserReports: PropTypes.object,
  reportsCount: PropTypes.number,
  respondedCount: PropTypes.number,
}

export default OptionsMember;