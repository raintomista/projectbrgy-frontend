import React from 'react';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import UserFollowingList from './UserFollowingList';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';

const UserProfileFollowingListView = (props) => {
    const { AppData } = props;
    return (
        <div className="row">
            {/* User Profile Details Section (Left) */}
            <div className="col-md-3">
                <UserProfileDetails AppData={AppData} history={props.history} />
            </div>

            {/* User Profile Stats and Newsfeed Section (Middle) */}
            <div className="col-md-6">
                <UserProfileStats profileId={AppData.profileData.user_id} />
                <UserFollowingList AppData={AppData} />
            </div>
        </div>
    );
}

export default UserProfileFollowingListView;