import React from 'react';

import BrgyPageFollowersList from 'components/brgy-page/BrgyPageFollowersList';
import BrgyPageFollowingList from 'components/brgy-page/BrgyPageFollowingList';
import BrgyPageShared from 'components/brgy-page/BrgyPageShared';
import BrgyPagePosts from 'components/brgy-page/BrgyPagePosts';

import BrgyPageDetails from 'components/brgy-page/BrgyPageDetails';
import BrgyPageStats from 'components/brgy-page/BrgyPageStats';
import { observer } from 'mobx-react';
import 'components/brgy-page/BrgyPageStats.less'

const BrgyPageView = observer((props) => {

  return (
    <div className="row">
      {/* Brarangay Page Details Section (Left) */}
      <div className="col-md-3">
        <BrgyPageDetails {...props} />
      </div>

      {/* Brarangay Page Stats and Newsfeed Section (Middle) */}
      <div className="col-md-6">
        <BrgyPageStats {...props} />
        {renderView(props)}
      </div>
    </div>
  );
});

function renderView(props) {
  const { BrgyPageStore } = props;
  const { viewType } = BrgyPageStore;


  if (typeof viewType === 'undefined') {
    return <BrgyPagePosts {...props} />;
  }
  else if (viewType === 'shared_posts') {
    BrgyPageStore.getBrgyPageSharedPosts(BrgyPageStore.data.id);
    return <BrgyPageShared {...props} />;
  }
  else if (viewType === 'followers_list') {
    BrgyPageStore.getBrgyPageFollowersList(BrgyPageStore.data.id);
    return <BrgyPageFollowersList {...props} />;
  }
  else if (viewType === 'following_list') {
    BrgyPageStore.getBrgyPageFollowingList(BrgyPageStore.data.id);
    return <BrgyPageFollowingList {...props} />
  }
}


export default BrgyPageView;