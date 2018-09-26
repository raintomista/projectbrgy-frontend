import React, { Component } from 'react';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import BrgySharedPostCard from 'components/common/Post/PostCard';
import 'components/brgy-page/BrgyPageFollowList.less';

@observer
export default class BrgyPageShared extends Component {
  componentWillMount() {
    const { BrgyPageStore } = this.props;
    BrgyPageStore.initBarangayPageSharedPosts();
  }
  render() {
    const { AppData, BrgyPageStore } = this.props;
    const { data, hasMore, pageStart, sharedPosts } = BrgyPageStore;
    const items = sharedPosts.map((post, index) => {
      return <BrgySharedPostCard
        key={post.share_id}

        // Author of the Share Post
        attachments={post.attachments}
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
        <InfiniteScroll
          pageStart={pageStart}
          loadMore={(page) => {
            BrgyPageStore.getBrgyPageSharedPosts(data.id, page)
          }}
          hasMore={hasMore}
          loader={this.renderLoader()}
        >
          {items}
        </InfiniteScroll>
        {BrgyPageStore.sharedPosts.length === 0 && !hasMore && (
          <div className="brgy-page-empty-filler">
            {AppData.loggedUser.user_role === 'barangay_page_admin' && AppData.loggedUser.user_barangay_id === data.id
              ? <h6>You haven't shared any posts yet!</h6>
              : <h6>{data.name} hasn't shared any posts yet!</h6>
            }
          </div>
        )}
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

  renderLoader() {
    return (
      <div className="content-loader" key={0}>
        <object data="images/loader.svg" type="image/svg+xml">
        </object>
      </div>
    );
  }
}