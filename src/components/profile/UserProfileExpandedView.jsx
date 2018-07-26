import React from 'react';
import { Link } from 'react-router-dom';

/*--------------- Mobx ---------------*/
import { observer } from 'mobx-react';

/*--------------- FontAwesome Icons ---------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faMobileAlt from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';

/*--------------- Stylesheet  ---------------*/
import './UserProfileExpandedView.less';

const UserProfileExpandedView = observer((props) => {
  const { AppData } = props;
  const profileData = AppData.profileData;

  return (
    <div className="row">
      {/* User Profile Expanded Details */}
      <div className="col-md-12 col-lg-9">
        <div className="row user-profile-expanded-details">

          {/* User Details (Left Side) */}
          <div className="col-md-4 ">
            <div className="basic-info card-body">

              {/* User Profile Picture, Full Name, and Location */}
              <img src="images/default-user.png" alt="" className="card-img" />
              <h3 className="card-title">{profileData && `${profileData.user_first_name} ${profileData.user_last_name}`}</h3>
              <p className="card-text">{profileData && `${profileData.barangay_page_municipality}`}</p>

              {/* User Stats */}
              <div className="user-stats">
                <ul className="nav justify-content-center nav-fill">
                  <li className="nav-item">
                    <Link className="nav-link" to=''>
                      <span className="nav-item-title">Following</span>
                      <span className="nav-item-value">50</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Details (Right Side) */}
          <div className="col-md-8">

            {/* User Additional Info */}
            <div className="additional-info">

              {/* Barangay Info Section */}
              <div className="brgy-info-section">
                {/* Section Heading */}
                <div className="row">
                  <div className="col">
                    <h4>Barangay Information</h4>
                  </div>
                </div>

                {/* Region */}
                <div className="row">
                  <div className="col">
                    <span>Region: {profileData && `${profileData.barangay_page_region}`}</span>
                  </div>
                </div>

                {/* Province */}
                <div className="row">
                  <div className="col">
                    <span>Province: {profileData && `${profileData.barangay_page_province}`}</span>
                  </div>
                </div>

                {/* City/Municipality */}
                <div className="row">
                  <div className="col">
                    <span>City/Municipality: {profileData && `${profileData.barangay_page_municipality}`}</span>
                  </div>
                </div>

                {/* Barangay */}
                <div className="row">
                  <div className="col">
                    <span>Barangay: {profileData && `${profileData.barangay_page_name}`}</span>
                  </div>
                </div>

                {/* Barangay Captain */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Captain: {profileData && `${profileData.barangay_page_captain}`}</span>
                  </div>
                </div>

                {/* Barangay Office Address */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Office Address: {profileData && `${profileData.barangay_page_office_address_street}`}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info Section*/}
              <div className="contact-info-section">
                {/* Section Heading */}
                <div className="row">
                  <div className="col">
                    <h4>Contact Information</h4>
                  </div>
                </div>

                {/* Details */}
                <div className="row">
                  <div className="col">
                    <ul className="list-group list-group-flush">

                      {/* User Email Address */}
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

                      {/* User Mobile Number */}
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

                      {/* User Landline Number */}
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

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 d-none d-lg-block d-xl-block">
        <div className="card">
          <div className="card-body">
            &nbsp;
        </div>
        </div>
      </div>
    </div>
  );
});

export default UserProfileExpandedView;