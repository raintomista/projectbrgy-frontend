import React from 'react';
import UserProfileDetails from 'components/profile/UserProfileDetails';

const UserProfileExpandedView = (props) => {
  return (
    <div className="row">
      {/* User Profile Expanded Details */}
      <div className="col-md-9">
        <div className="row user-profile-expanded-details">
          <div className="col-md-4 basic-info">
            <div className="card-body">
              <h3 class="card-title">Juan Dela Cruz</h3>
              <p class="card-text">Caloocan City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileExpandedView;