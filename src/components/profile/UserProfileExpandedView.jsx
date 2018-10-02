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
  const { AppData, UserProfileStore } = props;
  const { loggedUser } = AppData;
  const data = UserProfileStore.data;
  const { stats } = data;

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
              <Link to={viewTimeline(data.user_id)} className="card-title">
                {data && `${data.user_first_name} ${data.user_last_name}`}
              </Link>
              <p className="card-text">{data && `${data.barangay_page_municipality}`}</p>

              {/* User Stats */}
              <div className="user-stats">
                <ul className="nav justify-content-center nav-fill">
                  <li className="nav-item">
                    <Link className="nav-link" to={viewFollowing(data.user_id, loggedUser)}>
                      <span className="nav-item-title">Following</span>
                      <span className="nav-item-value">{stats.following_count}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {loggedUser.user_role === 'barangay_member' && loggedUser.user_id !== data.user_id && (
                <div className="message-btn">
                  <Link to={sendMessage(data.user_id)} className="btn rounded">Message</Link>
                </div>
              )}
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

                    <span>Region: {data && `${data.barangay_page_region}`}</span>
                  </div>
                </div>

                {/* Province */}
                <div className="row">
                  <div className="col">
                    <span>Province: {data && `${data.barangay_page_province}`}</span>
                  </div>
                </div>

                {/* City/Municipality */}
                <div className="row">
                  <div className="col">
                    <span>City/Municipality: {data && `${data.barangay_page_municipality}`}</span>
                  </div>
                </div>

                {/* Barangay */}
                <div className="row">
                  <div className="col">
                    <span>Barangay: {data && `${data.barangay_page_name}`}</span>
                  </div>
                </div>

                {/* Barangay Captain */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Captain: {data && `${data.barangay_page_captain}`}</span>
                  </div>
                </div>

                {/* Barangay Office Address */}
                <div className="row">
                  <div className="col">
                    <span>Barangay Office Address: {data && `${data.barangay_page_office_address_street}`}</span>
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
                      {data && data.user_email && (
                        <li className="list-group-item">
                          <a href={'mailto:' + data.user_email} className="card-link">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <span>
                              {data.user_email}
                            </span>
                          </a>
                        </li>
                      )}

                      {/* User Mobile Number */}
                      {data && data.user_mobile_number && (
                        <li className="list-group-item">
                          <a href={'callto:' + data.user_mobile_number} className="card-link">
                            <FontAwesomeIcon icon={faMobileAlt} className="icon" />
                            <span>
                              {data.user_mobile_number}
                            </span>
                          </a>
                        </li>
                      )}

                      {/* User Landline Number */}
                      {data && data.user_landline_number && (
                        <li className="list-group-item">
                          <a href={'callto:' + data.user_landline_number} className="card-link">
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                            <span>
                              {data.user_landline_number}
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

const sendMessage = (profileId) => ({
  pathname: `/messages/${profileId}`,
})

const viewTimeline = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}`
});

const viewFollowing = (profileId, loggedUser) => {
  if ((loggedUser.user_role === 'barangay_member' && loggedUser.user_id !== profileId) || (loggedUser.user_role === 'barangay_page_admin')) {
    return ({
      pathname: '/profile',
      search: `?id=${profileId}`
    });
  } else {
    return ({
      pathname: '/profile',
      search: `?id=${profileId}&view=following_list`
    });
  }
}
export default UserProfileExpandedView;