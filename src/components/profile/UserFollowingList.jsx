import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import 'components/profile/UserFollowingList.less'

const UserFollowingList = observer((props) => {
  const { AppData } = props;

  return (
    <div className="user-following-list card">
      <div className="card-body">
        <h4 className="card-title">Following</h4>

        {/* Following List */}
        <ul className="list-group list-group-flush">
          {
            AppData.profileFollowingList.map((barangay, index) => {
              return (
                <li className="list-group-item" key={index}>
                  <div className="wrapper">
                    {/* Profile Pic */}
                    <img src="images/default-brgy.png" className="profile-pic" alt="" />

                    {/* Barangay Name and Location */}
                    <div className="brgy-info">
                      <Link to={viewBarangayPage(barangay.barangay_page_id)} className="brgy-name">{barangay.barangay_page_name}</Link>
                      <div className="brgy-location">
                        {`${barangay.barangay_page_municipality}, ${barangay.barangay_page_province}, ${barangay.barangay_page_region}`}
                      </div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <div className="follow-btn">
                    <a href="" className="btn rounded">Follow</a>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
});

const viewBarangayPage = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}`
});

export default UserFollowingList;