import React, { Component } from 'react';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';
import UserSharedPostCard from 'components/common/Post/PostCard';

import { observer } from 'mobx-react';

@observer
export default class UserProfileNewsfeedView extends Component {

  render() {
    const { AppData, UserProfileStore } = this.props;
    const { sharedPosts } = UserProfileStore;

    const posts = sharedPosts.map((post, index) => {
      return <UserSharedPostCard
        key={post.share_post_id}

        // Author of the Share Post
        authorId={post.share_user_id}
        authorImg={'images/default-user.png'}
        authorName={`${post.user_first_name} ${post.user_last_name}`}
        authorRole={post.share_user_role}
        authorLocation={post.barangay_page_municipality}


        disableInteractions={true}
        handleDeletePost={() => this._handleDeletePost(post.post_id, index)}
        isLiked={0}
        loggedUser={AppData.loggedUser}

        // Share Post
        postId={post.share_post_id}
        postBrgyId={post.user_barangay_id}
        postDate={post.share_date_created}
        postMessage={post.share_caption}
        postType={'sharePost'}

        // Shared Post (Post that is being shared)
        sharedPostId={post.post_id}
        sharedPostAuthor={post.barangay_page_name}
        sharedPostAuthorId={post.post_barangay_id}
        sharedPostAuthorImg={'images/default-brgy.png'}
        sharedPostDate={post.post_date_created}
        sharedPostLocation={post.barangay_page_municipality}
        sharedPostMessage={post.post_message}

        // Stats of the Share Post
        statsComments={0}
        statsLikes={0}
        statsShares={0}
      />
    });

    return (
      <div className="row">
        {/* User Profile Details Section (Left) */}
        <div className="col-md-3">
          <UserProfileDetails AppData={AppData} UserProfileStore={UserProfileStore} history={this.props.history} />
        </div>

        {/* User Profile Stats and Newsfeed Section (Middle) */}
        <div className="col-md-6">
          <UserProfileStats AppData={AppData} UserProfileStore={UserProfileStore} />
          {posts}
        </div>
      </div>
    );
  }

  _handleDeletePost(postId, index) {
    const { UserProfileStore } = this.props;
    UserProfileStore.unsharePost(postId, index);
  }
}