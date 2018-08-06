import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCamera, faMapMarkerAlt, faTag, faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import { observer } from 'mobx-react';


const DashboardPostBox = observer((props) => {
  const { loggedUser } = props.AppData;

  if (loggedUser && loggedUser.user_role !== 'barangay_member') {
    return (
      <div className="dashboard-post-box card">
        <div className="card-body">
          <textarea rows="4"></textarea>
          <div className="options">
            <button className="btn rounded-light">Post</button>
          </div>
        </div>
      </div>
    );
  }
  else {
    return null;
  }
});

export default DashboardPostBox;