import React from 'react';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import UserProfileDetails from 'components/profile/UserProfileDetails';
import UserProfileStats from 'components/profile/UserProfileStats';

const UserProfileNewsfeedView = (props) => {
    return (
        <div className="row">
            {/* User Profile Details Section (Left) */}
            <div className="col-md-3">
                <UserProfileDetails AppData={props.AppData} history={props.history} />
            </div>

            {/* User Profile Stats and Newsfeed Section (Middle) */}
            <div className="col-md-6">
                <UserProfileStats />
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

export default UserProfileNewsfeedView;