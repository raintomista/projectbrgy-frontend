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
      <div className="col-md-4 col-lg-3 col-xl-3">
        <BrgyPageDetails {...props} />
      </div>

      {/* Brarangay Page Stats and Newsfeed Section (Middle) */}
      <div className="col-md-8 col-lg-7 col-xl-6">
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
    return <BrgyPageShared {...props} />;
  }
  else if (viewType === 'followers_list') {
    return <BrgyPageFollowersList {...props} />;
  }
  else if (viewType === 'following_list') {
    return <BrgyPageFollowingList {...props} />
  }
}


export default BrgyPageView;