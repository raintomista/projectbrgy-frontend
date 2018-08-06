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

/*--------------- Stylesheets ---------------*/
import 'stylesheets/containers/Dashboard.less';

@observer
export default class Dashboard extends Component {
  componentDidMount() {
    this.props.AppData.getUserDetails();
    this.props.DashboardStore.getPostsFromFollowing(10);
  }

  render() {
    const { AppData, DashboardStore } = this.props;
    const { loadedPosts } = DashboardStore;

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

                {loadedPosts.map((post, index) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}