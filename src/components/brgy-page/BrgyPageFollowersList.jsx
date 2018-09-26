import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import 'components/brgy-page/BrgyPageFollowList.less';
@observer
export default class BrgyPageFollowersList extends Component {
  componentWillMount() {
    const { BrgyPageStore } = this.props;
    BrgyPageStore.initBarangayPageFollowers();
  }
  render() {
    const { AppData, BrgyPageStore } = this.props;
    const { data, followersList, hasMore, pageStart } = BrgyPageStore;
    const items = followersList.map((follower, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="wrapper">

            {/* Barangay Member Profile Pic */}
            {follower.user_id !== null && (
              <Link to={this.viewUserProfile(follower.user_id)}>
                <img src="images/default-user.png" className="profile-pic" alt="" />
              </Link>
            )}

            {/* Barangay Page Profile Pic */}
            {follower.user_id === null && (
              <Link to={this.viewBrgyPage(follower.barangay_page_id)}>
                <img src="images/default-brgy.png" className="profile-pic" alt="" />
              </Link>
            )}


            {/* Follower Name and Location */}
            <div className="item-info">

              {/* Barangay Member Follower Name */}
              {follower.user_id !== null && (
                <Link to={this.viewUserProfile(follower.user_id)} className="item-name">
                  {`${follower.user_first_name} ${follower.user_last_name}`}
                </Link>
              )}

              {/* Barangay Page Follower Name */}
              {follower.user_id === null && (
                <Link to={this.viewBrgyPage(follower.barangay_page_id)} className="item-name">
                  {`${follower.barangay_page_name}`}
                </Link>
              )}

              {/* Follow Location */}
              <div className="item-location">
                {`${follower.barangay_page_municipality}, ${follower.barangay_page_province}, ${follower.barangay_page_region}`}
              </div>
            </div>
          </div>

          {/* Message Button (Do not display to logged user) */}
          {follower.user_role === null && AppData.loggedUser.user_barangay_id !== follower.barangay_page_id && <a className="btn rounded">Message</a>}
          {follower.user_role === 'barangay_member' && AppData.loggedUser.user_id !== follower.user_id && <a className="btn rounded">Message</a>}
        </li>
      );
    });

    return (
      <div className="brgy-follow-list card">
        <div className="card-body">
          <h4 className="card-title">Followers</h4>

          {/* Followers List */}
          <ul className="list-group list-group-flush">
            <InfiniteScroll
              pageStart={pageStart}
              loadMore={(page) => {
                BrgyPageStore.getBrgyPageFollowersList(data.id, page)
              }}
              hasMore={hasMore}
              loader={this.renderLoader()}
            >
              {items}
            </InfiniteScroll>

            {BrgyPageStore.followersList.length === 0 && !hasMore && (
              <div className="brgy-page-empty-filler">
                {AppData.loggedUser.user_role === 'barangay_page_admin' && AppData.loggedUser.user_barangay_id === data.id
                  ? <h6>You don't have followers yet!</h6>
                  : <h6>{data.name} doesn't have followers yet!</h6>
                }
              </div>
            )}
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

  viewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
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

