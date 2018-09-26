import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';

import 'components/brgy-page/BrgyPageFollowList.less';

@observer
export default class BrgyPageFollowingList extends Component {

  render() {
    const { AppData, BrgyPageStore } = this.props;
    const { user_barangay_id: loggedUserBrgyId, user_role: loggedUserRole } = AppData.loggedUser;
    const { data, followingList, hasMore, pageStart } = BrgyPageStore;
    const items = followingList.map((barangay, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="wrapper">
            {/* Profile Pic */}
            <img src="images/default-user.png" className="profile-pic" alt="" />

            {/* Following Name and Location */}
            <div className="item-info">

              {/* Following Name */}
              <Link to={this.viewBrgyPage(barangay.barangay_page_id)} className="item-name">{barangay.barangay_page_name}</Link>

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
                onClick={() => BrgyPageStore.unfollowBarangayFromList(loggedUserRole, loggedUserBrgyId, barangay.barangay_page_id, index)}
              >
                Following
              </a> :
              <a className="btn rounded"
                onClick={() => BrgyPageStore.followBarangayFromList(loggedUserRole, loggedUserBrgyId, barangay.barangay_page_id, index)}
              >
                Follow
              </a>
          }
        </li>
      );
    });

    return (
      <div className="brgy-follow-list card">
        <div className="card-body">
          <h4 className="card-title">Following</h4>

          {/* Following List */}
          <ul className="list-group list-group-flush">
            <InfiniteScroll
              pageStart={pageStart}
              loadMore={(page) => {
                BrgyPageStore.getBrgyPageFollowingList(data.id, page)
              }}
              hasMore={hasMore}
              loader={this.renderLoader()}
            >
              {items}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    );
  }

  viewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }

  renderLoader() {
    return (
      <li className="list-group-item loader" key={0}>
        <div className="content-loader">
          <object data="images/loader.svg" type="image/svg+xml">
          </object>
        </div>
      </li>
    );
  }
}

