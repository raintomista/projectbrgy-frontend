import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCamera, faMapMarkerAlt, faTag, faCalendarAlt } from '@fortawesome/fontawesome-free-solid';


const DashboardPostBox = (props) => (
  <div class="dashboard-post-box card">
    <div class="card-body">
      <textarea rows="4"></textarea>
      <div className="options">
        <div className="buttons">
          <button className="btn">
            <FontAwesomeIcon icon={faCamera} />
          </button>
          <button class="btn">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </button>
          <button class="btn">
            <FontAwesomeIcon icon={faTag} />
          </button>
          <button class="btn">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
        </div>
        <button className="btn rounded-light">Post</button>
      </div>
    </div>
  </div>
);

export default DashboardPostBox;