import React from 'react';
import { Link } from 'react-router-dom';
import UserProfileDetails from 'components/profile/UserProfileDetails';

/*--------------- FontAwesome Icons ---------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faMobileAlt from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';

import './UserProfileExpandedView.less';

const UserProfileExpandedView = (props) => {
  return (
    <div className="row">
      {/* User Profile Expanded Details */}
      <div className="col-md-9">
        <div className="row user-profile-expanded-details">

          {/* User Details (Left Side) */}
          <div className="col-md-4 ">
            <div className="basic-info card-body">

              {/* User Profile Picture, Full Name, and Location */}
              <img src="images/default-user.png" alt="" className="card-img" />
              <h3 class="card-title">Juan Dela Cruz</h3>
              <p class="card-text">Caloocan City</p>

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
            <div className="vertical-divider"></div>

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
                    <span>Region</span>
                  </div>
                </div>

                {/* Province */}
                <div className="row">
                  <div className="col">
                    <span>Province</span>
                  </div>
                </div>

                {/* City/Municipality */}
                <div className="row">
                  <div className="col">
                    <span>City/Municipality</span>
                  </div>
                </div>

                {/* Barangay */}
                <div className="row">
                  <div className="col">
                    <span>Barangay</span>
                  </div>
                </div>

                {/* Barangay Captain */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Captain</span>
                  </div>
                </div>

                {/* Barangay Office Address */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Office Address</span>
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
                      <li className="list-group-item">
                        <a className="card-link">
                          <FontAwesomeIcon icon={faEnvelope} className="icon" />
                          <span>rstomista@up.edu.ph</span>
                        </a>
                      </li>

                      {/* User Mobile Number */}
                      <li className="list-group-item">
                        <a className="card-link">
                          <FontAwesomeIcon icon={faMobileAlt} className="icon" />
                          <span>rstomista@up.edu.ph</span>
                        </a>
                      </li>

                      {/* User Landline Number */}
                      <li className="list-group-item">
                        <a className="card-link">
                          <FontAwesomeIcon icon={faPhone} className="icon" />
                          <span>rstomista@up.edu.ph</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            &nbsp;
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileExpandedView;