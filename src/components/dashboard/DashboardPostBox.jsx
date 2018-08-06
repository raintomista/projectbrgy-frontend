import React from 'react';

/*--------------- FontAwesome Library ---------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCamera, faMapMarkerAlt, faTag, faCalendarAlt } from '@fortawesome/fontawesome-free-solid';

/*--------------- Form ---------------*/
import form from 'forms/FormPostAnnouncement';

/*--------------- Utils ---------------*/
import { observer } from 'mobx-react';


const DashboardPostBox = observer((props) => {
  const { loggedUser } = props.AppData;
  let characterCount = 150 - form.values().message.length;

  return (
    <form onSubmit={form.onSubmit}>
      {loggedUser && loggedUser.user_role !== 'barangay_member' && (
        <div className="dashboard-post-box card">
          <div className="card-body">
            <textarea rows="4" {...form.$('message').bind()}></textarea>
            <div className="options">
              <span className={`${characterCount < 0 ? 'exceeded' : ''} character-count`}>
                {characterCount}
              </span>
              <button type="submit" className="btn rounded-light" disabled={characterCount === 150 || characterCount < 0}>Post</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
});

export default DashboardPostBox;