import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './Info.less';

const SideBarAdminInfo = (props) => {
  return (
    <React.Fragment>
      <img className="card-img mx-auto d-block" src={props.imgSrc} alt="" />
      <Link to={props.handleViewBrgyPage} className="card-title">
        {props.brgyName}
      </Link>
      <p className="card-text">{props.municipality}</p>
    </React.Fragment>
  );
}

SideBarAdminInfo.propTypes = {
  brgyName: PropTypes.string,
  handleViewBrgyPage: PropTypes.object,
  imgSrc: PropTypes.string,
  municipality: PropTypes.string
}

export default SideBarAdminInfo;