import React from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faMobileAlt from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import { observer } from 'mobx-react';

const UserProfileDetails = observer((props) => {
  const { AppData } = props;
  const profileData = AppData.profileData;

  return (
    <div className="user-profile-details card">
      {/* Essential User Details */}
      <div className="basic-details card-body">
        <img src="images/default-user.png" alt="" className="card-img" />
        <h3 className="card-title">
          {profileData && `${profileData.user_first_name} ${profileData.user_last_name}`}
        </h3>
        {/* <p className="card-text">Caloocan City</p> */}
      </div>

      {/* Additional User Details */}
      <ul className="additional-details list-group list-group-flush">

        {/* Email Address */}
        {profileData && profileData.user_email && (
          <li className="list-group-item">
            <a href={'mailto:' + profileData.user_email} className="card-link">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <span>
                {profileData.user_email}
              </span>
            </a>
          </li>
        )}

        {/* Mobile Number */}

        {profileData && profileData.user_mobile_number && (
          <li className="list-group-item">
            <a href={'callto:' + profileData.user_mobile_number} className="card-link">
              <FontAwesomeIcon icon={faMobileAlt} className="icon" />
              <span>
                {profileData.user_mobile_number}
              </span>
            </a>
          </li>
        )}

        {/* Landline Number */}

        {profileData && profileData.user_landline_number && (
          <li className="list-group-item">
            <a href={'callto:' + profileData.user_landline_number} className="card-link">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <span>
                {profileData.user_landline_number}
              </span>
            </a>
          </li>
        )}

        {/* See More Button */}
        <li className="see-more list-group-item">
          <Link to="" className="nav-link">See More</Link>
        </li>
      </ul>
    </div>
  );
});

export default UserProfileDetails;