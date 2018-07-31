import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faMobileAlt from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import 'components/profile/UserProfileDetails.less';

const UserProfileDetails = observer((props) => {
  const { UserProfileStore } = props;
  const { data } = UserProfileStore;

  return (
    <div className="user-profile-details card">
      {/* Essential User Details */}
      <div className="basic-details card-body">
        <img src="images/default-user.png" alt="" className="card-img" />
        <Link to={viewTimeline(data.user_id)} className="card-title">
          {data && `${data.user_first_name} ${data.user_last_name}`}
        </Link>
        <p className="card-text">{data && `${data.barangay_page_municipality}`}</p>
      </div>

      {/* Additional User Details */}
      <ul className="additional-details list-group list-group-flush">

        {/* Email Address */}
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

        {/* Mobile Number */}

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

        {/* Landline Number */}

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

        {/* See More Button */}
        <li className="see-more list-group-item">
          <a onClick={() => seeMore(props.history, UserProfileStore)} className="nav-link">See More</a>
        </li>
      </ul>
    </div>
  );
});

const viewTimeline = (profileId) => ({
  pathname: '/profile',
  search: `?id=${profileId}`
});

function seeMore(history, UserProfileStore) {
  history.push({
    pathname: '/profile',
    search: `?id=${UserProfileStore.data.user_id}&view=expanded_details`
  });

  UserProfileStore.setProfileView('expanded_details');
}

export default UserProfileDetails;