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
        <Link to='/dashboard' className="card-link">Resident Count</Link>
        <span className="badge">{props.residentCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Message</Link>
        <span className="badge">{props.messageCount}</span>
      </li>
      
      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">E-Services</Link>
        <span className="badge">{props.eServicesCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">E-Resources</Link>
        <span className="badge">{props.eResourcesCount}</span>
      </li>

      <li className="list-group-item">
        <Link to='/dashboard' className="card-link">Followers</Link>
        <span className="badge">{props.followersCount}</span>
      </li>

      <li className="list-group-item"></li>
    </ul>
  );
});

OptionsAdmin.propTypes = {
  adminName: PropTypes.string,
  eResourcesCount: PropTypes.number,      
  eServicesCount: PropTypes.number, 
  followersCount: PropTypes.number, 
  messageCount: PropTypes.number,
  residentCount: PropTypes.number,
}

export default OptionsAdmin;