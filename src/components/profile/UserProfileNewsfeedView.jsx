import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';
import UserSharedPostCard from 'components/common/Post/PostCard';

import { observer } from 'mobx-react';

@observer
export default class UserProfileNewsfeedView extends Component {
  componentWillMount() {
    const { UserProfileStore } = this.props;
    UserProfileStore.initSharedPosts();
  }

  render() {
    const { AppData, UserProfileStore } = this.props;
    const { data, sharedPosts, hasMore, pageStart } = UserProfileStore;
    const items = sharedPosts.map((post, index) => {
      return <UserSharedPostCard
        key={post.share_id}

        // Author of the Share Post
        attachments={post.attachments}
        authorId={post.share_user_id}
        authorImg={'images/default-user.png'}
        authorName={`${post.user_first_name} ${post.user_last_name}`}
        authorRole={post.share_user_role}
        authorLocation={post.share_barangay_municipality}

        disableInteractions={true}
        handleDeletePost={() => this._handleDeletePost(post.share_id, index)}
        isLiked={0}
        loggedUser={AppData.loggedUser}

        // Share Post
        postId={post.share_id}
        postBrgyId={post.user_barangay_id}
        postDate={post.share_date_created}
        postMessage={post.share_caption}
        postType={'sharePost'}

        // Shared Post (Post that is being shared)
        sharedPostId={post.post_id}
        sharedPostAuthor={post.post_barangay_name}
        sharedPostAuthorId={post.post_barangay_id}
        sharedPostAuthorImg={'images/default-brgy.png'}
        sharedPostDate={post.post_date_created}
        sharedPostLocation={post.post_barangay_municipality}
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
          <InfiniteScroll
            pageStart={pageStart}
            loadMore={(page) => {
              UserProfileStore.getUserSharedPosts(data.user_id, page)
            }}
            hasMore={hasMore}
            loader={this.renderLoader()}
          >
            {items}
          </InfiniteScroll>

          {sharedPosts.length === 0 && !hasMore && (
            <div className="brgy-page-empty-filler">
              {AppData.loggedUser.user_role === 'barangay_member' && AppData.loggedUser.user_id === data.user_id
                ? <h6>You haven't shared any shared any posts yet!</h6>
                : <h6>{`${data.user_first_name} ${data.user_last_name}`} hasn't shared any posts yet!</h6>
              }
            </div>
          )}
        </div>
      </div>
    );
  }

  _handleDeletePost(postId, index) {
    const prompt = window.confirm("Are you sure you want to delete this post?");
    if (prompt) {
      const { UserProfileStore } = this.props;
      UserProfileStore.unsharePost(postId, index);
    }
  }

  renderLoader() {
    return (
      <div className="content-loader" key={0}>
        <object data="images/loader.svg" type="image/svg+xml">
        </object>
      </div>
    );
  }
}