import React, { Component } from 'react';
import { observer } from 'mobx-react';

import BarangayPostCard from 'components/common/Post/PostCard';
import DashboardPostBox from 'components/dashboard/subcomponents/PostBox';
import InfiniteNewsFeed from 'components/dashboard/subcomponents/InfiniteNewsFeed';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';

// Store
import RootStore from 'stores/RootStore';

// Stylesheet
import './View.less';

@observer
export default class DashboardView extends Component {
  constructor(props) {
    super(props);
    this._loadMorePosts = this._loadMorePosts.bind(this);
    RootStore.DashboardStore.initNewsfeed();
  }

  componentDidMount() {
    document.title = "B2P"
    RootStore.AppData.getUserDetails();
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;
    const { newsfeedPosts } = DashboardStore;
    const items = this._getNewsfeedItems(newsfeedPosts);

    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row ">
              <div className="col-md-4 col-lg-4 col-xl-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="col-md-8 col-lg-7 col-xl-6">

                {loggedUser && loggedUser.user_role !== 'barangay_member' && (
                  <DashboardPostBox
                    DashboardStore={DashboardStore}
                  />
                )}

                <h6 className="newsfeed-title">News Feed</h6>

                <InfiniteNewsFeed
                  pageStart={DashboardStore.pageStart}
                  loadMore={(page) => { this._loadMorePosts(page) }}
                  hasMore={DashboardStore.hasMore}
                  loader={this.renderLoader()}
                >
                  <div className="posts">
                    {items}
                  </div>
                </InfiniteNewsFeed>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }


  _deletePost(postId, index) {
    const prompt = window.confirm("Are you sure you want to delete this post?");
    if (prompt) {
      const { DashboardStore } = RootStore;
      DashboardStore.deleteAPost(postId, index);
    }
  }

  _getNewsfeedItems(arr) {
    return arr.map((post, index) => (
      <BarangayPostCard
        key={post.post_id}
        authorId={post.barangay_page_id}
        authorImg={'images/default-brgy.png'}
        authorName={post.barangay_page_name}
        authorRole={'barangay_page_admin'}
        authorLocation={post.barangay_page_municipality}
        attachments={post.attachments}
        handleDeletePost={() => this._deletePost(post.post_id, index)}
        isLiked={post.is_liked}
        loggedUser={RootStore.AppData.loggedUser}
        postId={post.post_id}
        postBrgyId={post.post_barangay_id}
        postDate={post.post_date_created}
        postMessage={post.post_message}
        postType={'announcement'}
        statsComments={post.comment_count}
        statsLikes={post.like_count}
        statsShares={post.share_count}
      />
    ));
  }

  renderLoader() {
    return (
      <div className="content-loader" key={0}>
        <object data="images/loader.svg" type="image/svg+xml">
        </object>
      </div>
    );
  }

  _loadMorePosts(page) {
    const { DashboardStore } = RootStore;
    DashboardStore.getNewsfeedPosts(page);
  }
}