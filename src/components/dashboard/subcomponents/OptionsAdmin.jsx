import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import './Options.less';

const OptionsAdmin = observer((props) => {
  return (
    <ul className="dashboard-sidebar-options list-group list-group-flush">
      <li className="list-group-item disabled">Logged in as {props.adminName}</li>

      <li className="list-group-item">
        <Link to={props.handleViewBrgyResidents} className="card-link">Residents</Link>
        <span className="badge">{props.residentCount > 0 && props.residentCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Message</Link>
        <span className="badge">{props.messageCount > 0 && props.messageCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard/my-barangay/reports' className="card-link">Reports</Link>
        <span className="badge">{props.reportsCount > 0 && props.reportsCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard/my-barangay/e-services' className="card-link">E-Services</Link>
        <span className="badge">{props.eServicesCount > 0 && props.eServicesCount}</span>
      </li>

      <li className="list-group-item">
        <Link to={props.handleViewBrgyFollowersList} className="card-link">Followers</Link>
        <span className="badge">{props.followersCount > 0 && props.followersCount}</span>
      </li>

      <li className="list-group-item"></li>
    </ul>
  );
});

OptionsAdmin.propTypes = {
  adminName: PropTypes.string,
  eServicesCount: PropTypes.number,
  followersCount: PropTypes.number,
  handleViewBrgyResidents: PropTypes.object,
  handleViewBrgyFollowersList: PropTypes.object,
  messageCount: PropTypes.number,
  reportsCount: PropTypes.number,  
  residentCount: PropTypes.number,
}

export default OptionsAdmin;