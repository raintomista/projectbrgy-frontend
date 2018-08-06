/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- Components ---------------*/
import NavBar from 'components/common/NavBar';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import DashboardPostBox from 'components/dashboard/DashboardPostBox';
import DashboardSidebar from 'components/dashboard/DashboardSidebar';
import NewsFeedOptions from 'components/dashboard/NewsFeedOptions';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom'
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

    loadedPosts.map((post, index) => {
      items.push(
        <DashboardFeedCard
          imgSrc="images/default-brgy.png"
          authorName={post.barangay_page_name}
          brgyId={post.barangay_page_id}
          city={post.barangay_page_municipality}
          date={post.post_date_created}
          key={post.post_id}
          postId={post.post_id}
          postMessage={post.post_message}
        />
      );
    });

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

  getPosts(page) {
    const { DashboardStore } = RootStore;
    DashboardStore.getPostsFromFollowing(page, 4);
  }
}