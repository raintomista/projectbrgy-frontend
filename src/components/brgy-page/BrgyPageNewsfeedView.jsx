import React from 'react';
import BrgyPageDetails from 'components/brgy-page/BrgyPageDetails';
import BrgyPageStats from './BrgyPageStats';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';

import 'components/brgy-page/BrgyPageStats.less'

const BrgyPageNewsfeedView = (props) => {
    
  return (
    <div className="row">
      {/* Brarangay Page Details Section (Left) */}
      <div className="col-md-3">
        <BrgyPageDetails {...props} />
      </div>

      {/* Brarangay Page Stats and Newsfeed Section (Middle) */}
      <div className="col-md-6">
        <BrgyPageStats {...props} />
        <DashboardFeedCard
          imgSrc="images/default-brgy.png"
          authorName="Barangay 69"
          city="Caloocan City"
          date={new Date()}
        />
        <DashboardFeedCard
          imgSrc="images/default-brgy.png"
          authorName="Barangay 69"
          city="Caloocan City"
          date={new Date()}
        />
      </div>
    </div>
  );
}

export default BrgyPageNewsfeedView;