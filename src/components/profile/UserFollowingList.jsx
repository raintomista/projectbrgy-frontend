import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';
import 'components/profile/UserFollowingList.less'

@observer
export default class UserFollowingList extends Component {
  componentWillMount() {
    const { UserProfileStore } = this.props;
    UserProfileStore.initFollowingList();
  }
  render() {
    const { AppData, UserProfileStore } = this.props;
    const { data, followingList, hasMore, pageStart } = UserProfileStore;
    const items = followingList.map((barangay, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="wrapper">
            {/* Profile Pic */}
            <Link to={this.viewBarangayPage(barangay.barangay_page_id)}>
              <img src="images/default-brgy.png" className="profile-pic" alt="" />
            </Link>

            {/* Barangay Name and Location */}
            <div className="brgy-info">
              <Link to={this.viewBarangayPage(barangay.barangay_page_id)} className="brgy-name">{barangay.barangay_page_name}</Link>
              <div className="brgy-location">
                {`${barangay.barangay_page_municipality}, ${barangay.barangay_page_province}, ${barangay.barangay_page_region}`}
              </div>
            </div>
          </div>

          {/* Follow Button */}
          {
            barangay.is_following === 1 ?
              <a className="d-none d-lg-inline btn rounded filled" onClick={() => UserProfileStore.unfollowBarangay(barangay.barangay_page_id, index)}>Following</a> :
              <a className="d-none d-lg-inline btn rounded" onClick={() => UserProfileStore.followBarangay(barangay.barangay_page_id, index)}>Follow</a>
          }
        </li >
      );
    });

    return (
      <div className="user-following-list card" >
        <div className="card-body">
          <h4 className="card-title">Following</h4>
          {/* Following List */}
          <ul className="list-group list-group-flush">
            <InfiniteScroll
              pageStart={pageStart}
              loadMore={(page) => {
                UserProfileStore.getUserFollowingList(data.user_id, page)
              }}
              hasMore={hasMore}
              loader={this.renderLoader()}
            >
              {items}
            </InfiniteScroll>
            {followingList.length === 0 && !hasMore && (
              <div className="brgy-page-empty-filler">
                {AppData.loggedUser.user_role === 'barangay_member' && AppData.loggedUser.user_id === data.user_id
                  ? <h6>You haven't followed any barangay pages yet!</h6>
                  : <h6>{`${data.user_first_name} ${data.user_last_name}`} hasn't followed any barangay pages yet!</h6>
                }
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }

  viewBarangayPage(brgyId) {
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