import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import 'components/brgy-page/BrgyPageFollowList.less';

const BrgyPageFollowingList = observer((props) => {
  const { AppData, BrgyPageStore } = props;
  const { followingList } = BrgyPageStore;

  return (
    <div className="brgy-follow-list card">
      <div className="card-body">
        <h4 className="card-title">Following</h4>

        {/* Following List */}
        <ul className="list-group list-group-flush">
          {BrgyPageStore.loading && (
            <li className="list-group-item">
              <div className="loader">
                <object data="images/loader.svg" type="image/svg+xml">
                </object>
              </div>
            </li>)
          }
          {
            !BrgyPageStore.loading && followingList.map((barangay, index) => {
              return (
                <li className="list-group-item" key={index}>
                  <div className="wrapper">
                    {/* Profile Pic */}
                    <img src="images/default-user.png" className="profile-pic" alt="" />

                    {/* Following Name and Location */}
                    <div className="item-info">

                      {/* Following Name */}
                      <Link to={viewBrgyPage(barangay.barangay_page_id)} className="item-name">{barangay.barangay_page_name}</Link>

                      {/* Following Location */}
                      <div className="item-location">
                        {`${barangay.barangay_page_municipality}, ${barangay.barangay_page_province}, ${barangay.barangay_page_region}`}
                      </div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  {
                    barangay.is_following === 1 ?
                      <a
                        className="btn rounded filled"
                        onClick={() => BrgyPageStore.unfollowBarangayFromList(barangay.barangay_page_id, index)}
                      >
                        Following
                      </a> :
                      <a className="btn rounded"
                        onClick={() => BrgyPageStore.followBarangayFromList(barangay.barangay_page_id, index)}
                      >
                        Follow
                      </a>
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
});

const viewBrgyPage = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}`
});

export default BrgyPageFollowingList;