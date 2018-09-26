import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';


import BrgyPostCard from 'components/common/Post/PostCard';
import 'components/brgy-page/BrgyPageFollowList.less';

@observer
export default class BrgyPagePosts extends Component {
  componentWillMount() {
    const { BrgyPageStore } = this.props;
    BrgyPageStore.initBarangayPagePosts();
  }
  render() {
    const { AppData, BrgyPageStore } = this.props;
    const { data, hasMore, pageStart, posts } = BrgyPageStore;
    const items = posts.map((post, index) => {
      return <BrgyPostCard
        key={post.post_id}
        attachments={post.attachments}
        authorId={post.barangay_page_id}
        authorImg={'images/default-brgy.png'}
        authorName={post.barangay_page_name}
        authorRole={'barangay_page_admin'}
        authorLocation={post.barangay_page_municipality}
        handleDeletePost={() => this._handleDeletePost(post.post_id, index)}
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
    });
    return (
      <React.Fragment>
        <InfiniteScroll
          pageStart={pageStart}
          loadMore={(page) => BrgyPageStore.getBarangayPagePosts(data.id, page)}
          hasMore={hasMore}
          loader={this.renderLoader()}
        >
          {items}
        </InfiniteScroll>

        {BrgyPageStore.posts.length === 0 && !hasMore && (
          <div className="brgy-page-empty-filler">
            {AppData.loggedUser.user_role === 'barangay_page_admin' && AppData.loggedUser.user_barangay_id === data.id 
              ? <h6>You haven't posted any announcements yet!</h6>
              : <h6>{data.name} hasn't posted any announcements yet!</h6>
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
      BrgyPageStore.deleteBarangayPagePosts(postId, index);
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