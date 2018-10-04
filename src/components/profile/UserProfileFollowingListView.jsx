import React from 'react';
import UserFollowingList from './UserFollowingList';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';

const UserProfileFollowingListView = (props) => {
    const { AppData, UserProfileStore } = props;
    return (
        <div className="row">
            {/* User Profile Details Section (Left) */}
            <div className="col-md-4 col-lg-3 col-xl-3">
                <UserProfileDetails AppData={AppData} UserProfileStore={UserProfileStore} history={props.history} />
            </div>

            {/* User Profile Stats and Newsfeed Section (Middle) */}
            <div className="col-md-8 col-lg-7 col-xl-6">
                <UserProfileStats AppData={AppData} UserProfileStore={UserProfileStore} />
                <UserFollowingList AppData={AppData} UserProfileStore={UserProfileStore} />
            </div>
        </div>
    );
}

export default UserProfileFollowingListView;