import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import './Options.less';

const OptionsMember = observer((props) => {
  return (
    <ul className="dashboard-sidebar-options list-group list-group-flush">
      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">My Barangay</Link>
        <span className="badge"></span>
      </li>
      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Following</Link>
        <span className="badge">{props.followingCount}</span>
      </li>
      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Reports</Link>
        <span className="badge">{props.reportsCount}</span>
      </li>
      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Responded</Link>
        <span className="badge">{props.respondedCount}</span>
      </li>

      <li className="list-group-item"></li>
    </ul>
  );
});

OptionsMember.propTypes = {
  brgyId: PropTypes.string,
  followingCount: PropTypes.number,
  reportsCount: PropTypes.number,
  respondedCount: PropTypes.number,  
}

export default OptionsMember;