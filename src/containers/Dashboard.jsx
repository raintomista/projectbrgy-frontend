/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- Components ---------------*/
import NavBar from 'components/common/NavBar';
import BarangayPostCard from 'components/common/Post/PostCard';

import DashboardPostBox from 'components/dashboard/DashboardPostBox';
import DashboardSidebar from 'components/dashboard/DashboardSidebar';
import NewsFeedOptions from 'components/dashboard/NewsFeedOptions';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';

/*--------------- Stylesheets ---------------*/
import 'stylesheets/containers/Dashboard.less';

/*--------------- Mobx Stores ---------------*/
import RootStore from 'stores/RootStore';


@observer
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.props.AppData.getUserDetails();
  }

  render() {
    const { AppData, DashboardStore } = this.props;
    const { loadedPosts } = DashboardStore;

    const loader = <div className="loader" key={0}>Loading ...</div>;

    let items = [];

    loadedPosts.map((post, index) => (
      items.push(
        <BarangayPostCard
          key={post.post_id}
          authorId={post.barangay_page_id}
          authorImg={'images/default-brgy.png'}
          authorName={post.barangay_page_name}
          authorLocation={post.barangay_page_municipality}
          handleDeletePost={() => this._handleDeletePost(post.post_id)}
          isLiked={post.is_liked}
          loggedUser={AppData.loggedUser}
          postId={post.post_id}
          postBrgyId={post.post_barangay_id}
          postDate={post.post_date_created}
          postMessage={post.post_message}
          postType={'announcement'}
          statsComments={post.comment_count}
          statsLikes={post.like_count}
          statsShares={post.share_count}
        />
      )
    ));

    return (
      <div>
        {/* {this.state.logged === false && <Redirect to='/login' />} */}
        <NavBar AppData={AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <DashboardSidebar AppData={AppData} />
              </div>
              <div className="col-md-6">
                <DashboardPostBox AppData={AppData} />
                <NewsFeedOptions />
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.getPosts}
                  hasMore={DashboardStore.hasMoreItems}
                  loader={loader}
                  threshold={100}
                >
                  <div className="posts">
                    {items}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _handleDeletePost(postId, index) {
    const { DashboardStore } = RootStore;
    DashboardStore.deleteAPost(postId, index);
  }


  getPosts(page) {
    const { DashboardStore } = RootStore;
    DashboardStore.getPostsFromFollowing(page, 4);
  }
}