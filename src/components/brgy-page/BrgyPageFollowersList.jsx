import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import 'components/brgy-page/BrgyPageFollowList.less';

const BrgyPageFollowersList = observer((props) => {
  const { AppData, BrgyPageStore } = props;
  const { followers_list } = BrgyPageStore;

  return (
    <div className="brgy-follow-list card">
      <div className="card-body">
        <h4 className="card-title">Followers</h4>

        {/* Followers List */}
        <ul className="list-group list-group-flush">
          {
            followers_list.map((follower, index) => {
              return (
                <li className="list-group-item" key={index}>
                  <div className="wrapper">
                    {/* Profile Pic */}
                    <img src="images/default-user.png" className="profile-pic" alt="" />

                    {/* Follower Name and Location */}
                    <div className="item-info">

                      {/* Follow Name */}
                      <Link to={viewUserProfile(follower.user_id)} className="item-name">{`${follower.user_first_name} ${follower.user_last_name}`}</Link>

                      {/* Follow Location */}
                      <div className="item-location">
                        {`${follower.barangay_page_municipality}, ${follower.barangay_page_province}, ${follower.barangay_page_region}`}
                      </div>
                    </div>
                  </div>

                  {/* Message Button (Do not display to logged user) */}  
                  {AppData.loggedUser.id !== follower.user_id ? <a className="btn rounded">Message</a> : null}
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
});

const viewUserProfile = (userId) => ({
  pathname: '/profile',
  search: `?id=${userId}`
});

export default BrgyPageFollowersList;