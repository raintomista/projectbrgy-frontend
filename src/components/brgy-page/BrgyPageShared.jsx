import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import BrgySharedPostCard from 'components/common/Post/PostCard';


import 'components/brgy-page/BrgyPageFollowList.less';

@observer
export default class BrgyPageShared extends Component {
  render() {
    const { AppData, BrgyPageStore } = this.props;
    const { sharedPosts } = BrgyPageStore;
    const _sharedPosts = sharedPosts.map((post, index) => {
      return <BrgySharedPostCard
        key={post.share_id}

        // Author of the Share Post
        authorId={post.share_barangay_id}
        authorImg={'images/default-brgy.png'}
        authorName={post.barangay_page_name}
        authorRole={post.share_user_role}
        authorLocation={post.post_barangay_municipality}

        disableInteractions={true}
        handleDeletePost={() => this._handleDeletePost(post.share_id, index)}
        isLiked={0}
        loggedUser={AppData.loggedUser}

        // Share Post
        postId={post.share_id}
        postBrgyId={post.share_barangay_id}
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
      <React.Fragment>
        {BrgyPageStore.loading && (
          <div className="loader">
            <object data="images/loader.svg" type="image/svg+xml">
            </object>
          </div>
        )}
        {!BrgyPageStore.loading && _sharedPosts}
      </React.Fragment>
    );
  }

  _handleDeletePost(postId, index) {
    const prompt = window.confirm("Are you sure you want to delete this post?");
    if (prompt) {
      const { BrgyPageStore } = this.props;
      BrgyPageStore.unsharePost(postId, index);
    }
  }

}