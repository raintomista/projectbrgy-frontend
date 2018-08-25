import React from 'react';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';
import UserSharedPostCard from 'components/common/Post/PostCard';

import { observer } from 'mobx-react';


const UserProfileNewsfeedView = observer((props) => {
  const { AppData, UserProfileStore } = props;
  const { sharedPosts } = UserProfileStore;

  const posts = sharedPosts.map((post, index) => {
    return <UserSharedPostCard
      key={post.share_post_id}
      authorId={post.share_user_id}
      authorImg={'images/default-user.png'}
      authorName={`${post.user_first_name} ${post.user_last_name}`}
      authorRole={post.share_user_role}
      authorLocation={post.barangay_page_municipality}
      disableInteractions={true}
      handleDeletePost={() => this.deleteAPost(post.post_id)}
      isLiked={0}
      loggedUser={AppData.loggedUser}
      postId={post.post_id}
      postBrgyId={post.post_barangay_id}
      postDate={post.share_date_created}
      postMessage={post.share_caption}
      postType={'sharePost'}
      statsComments={0}
      statsLikes={0}
      statsShares={0}
    />
  });

  return (
    <div className="row">
      {/* User Profile Details Section (Left) */}
      <div className="col-md-3">
        <UserProfileDetails AppData={AppData} UserProfileStore={UserProfileStore} history={props.history} />
      </div>

      {/* User Profile Stats and Newsfeed Section (Middle) */}
      <div className="col-md-6">
        <UserProfileStats AppData={AppData} UserProfileStore={UserProfileStore} />
        {posts}
      </div>
    </div>
  );
});

export default UserProfileNewsfeedView;