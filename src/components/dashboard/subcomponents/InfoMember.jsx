import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './Info.less';

const SideBarMemberInfo = (props) => {
  return (
    <React.Fragment>
      <img className="card-img mx-auto d-block" src={props.imgSrc} alt="" />
      <Link to={props.handleViewUserProfile} className="card-title">
        {props.memberName}
      </Link>
      <p className="card-text">{props.brgyName}, <br /> {props.municipality}</p>
    </React.Fragment>
  );
}

SideBarMemberInfo.propTypes = {
  brgyName: PropTypes.string,
  imgSrc: PropTypes.string,
  handleViewUserProfile: PropTypes.object,
  memberName: PropTypes.string,
  municipality: PropTypes.string
}

export default SideBarMemberInfo;